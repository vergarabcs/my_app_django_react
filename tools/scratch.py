import json

import requests

response = requests.post(
    'http://localhost:8000/',
    verify=False,
    data=json.dumps=({
        'Hello': 'World'
    }),
)

print(response)
