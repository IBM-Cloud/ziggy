# Copyright 2015 IBM Corp. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import json
from flask import Flask, jsonify
from cloudant.account import Cloudant
from watson_developer_cloud import PersonalityInsightsV2 as PersonalityInsights

if 'VCAP_SERVICES' not in os.environ:
    raise RuntimeError("VCAP_SERVICES not found.")
elif 'cloudantNoSQLDB' not in json.loads(os.environ['VCAP_SERVICES']):
    raise RuntimeError("Cloudant database not bound to service.")

WATSON = json.loads(os.environ['VCAP_SERVICES'])['personality_insights'][0]
if 'credentials' not in WATSON:
    raise RuntimeError("Cannot connect to Watson.  Credentials not found for personality insights.")
else:
    personality_insights = PersonalityInsights(username=WATSON['credentials']['username'], password=WATSON['credentials']['password'])

CLOUDANT = json.loads(os.environ['VCAP_SERVICES'])['cloudantNoSQLDB'][0]
if 'credentials' not in CLOUDANT:
    raise RuntimeError("Cannot connect to database, Cloudant credentials not found.")
else:
    client = Cloudant(CLOUDANT['credentials']['username'], CLOUDANT['credentials']['password'], url=CLOUDANT['credentials']['url'])
    client.connect()

databases = ['personas', 'albums', 'songs']
for db in databases:
    if db not in client.all_dbs():
        raise RuntimeError("Database " + db + " not found, please ensure you have the needed data.")

cached_insights = {}
for persona in client['personas']:
    cached_insights[persona['_id']] = None

def assemble_persona_text(persona):
    text = ''
    for album in client['personas'][persona]['albums']:
        for song in client['albums'][album]['songs']:
            try:
                if 'lyrics' in client['songs'][song]:
                    text += client['songs'][song]['lyrics']
            except KeyError as e:
                print e  #just swallow it silently for now ToDo: something better...
    return text

## Begin Flask server
app = Flask(__name__)
if 'FLASK_DEBUG' in os.environ:
    app.debug = True

@app.route('/')
def Welcome():
    return app.send_static_file('index.html')

@app.route('/setup')
def Setup():
    return 'Setup complete.'


@app.route('/api/personas')
def GetPersonas():
    response = []
    for persona in client['personas']:
        response.append({'name': persona['_id'], 'albums': persona['albums']})

    return jsonify(results=response)

@app.route('/api/persona/<persona>')
def GetPersona(persona):
    if cached_insights[persona] is None:
        insight = personality_insights.profile(json.dumps({'text': assemble_persona_text(persona), 'contenttype': 'text/html'}))
        cached_insights[persona] = insight
    else:
        insight = cached_insights[persona]

    return jsonify(results=insight)

port = os.getenv('PORT', '5000')
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=int(port))
