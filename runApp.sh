trap "deactivate && kill 0" EXIT

source ../venv/Scripts/activate

npm run start & python ./backend/manage.py runserver