> Terminal 1

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export FLASK_APP=run.py
flask run
```

If you get CORS error, close the terminal and run `flask run` again in a new terminal.

> Terminal 2

```
cd frontend
npm install -g pnpm@latest-10
pnpm install
pnpm run dev
```
