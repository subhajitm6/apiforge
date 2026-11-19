2026-11-19T18:31:34.065780685Z ==> Downloading cache...
2026-11-19T18:31:34.091257418Z ==> Cloning from https://github.com/subhajitm6/apiforge
2026-11-19T18:31:35.459777471Z ==> Checking out commit ea97203e232853c2c18ace66a71dbc41e959735b in branch main
2026-11-19T18:31:35.879680593Z ==> Downloaded and extracted 50 MiB cache in 1s.
2026-11-19T18:31:36.188541183Z ==> Using Python version 3.14.10 (default)
2026-11-19T18:31:36.18855074Z ==> Docs on specifying a Python version: https://render.com/docs/python-version
2026-11-19T18:31:36.188678576Z ==> Installing Python version 3.14.10...
2026-11-19T18:31:40.273993416Z ==> Using Poetry version 2.1.3 (default)
2026-11-19T18:31:40.318628081Z ==> Docs on specifying a Poetry version: https://render.com/docs/poetry-version
2026-11-19T18:31:40.376013138Z ==> Running build command 'pip install -r requirements.txt'...
2026-11-19T18:31:40.749766254Z Collecting fastapi>=0.115.0 (from -r requirements.txt (line 1))
2026-11-19T18:31:40.751128775Z   Using cached fastapi-0.165.0-py3-none-any.whl.metadata (27 kB)
2026-11-19T18:31:40.770771666Z Collecting uvicorn>=0.30.0 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:31:40.771981268Z   Using cached uvicorn-0.54.0-py3-none-any.whl.metadata (6.6 kB)
2026-11-19T18:31:40.992518778Z Collecting sqlalchemy>=2.0.30 (from -r requirements.txt (line 3))
2026-11-19T18:31:40.99378039Z   Using cached sqlalchemy-2.1.9-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (9.7 kB)
2026-11-19T18:31:41.037511829Z Collecting psycopg2-binary>=2.9.9 (from -r requirements.txt (line 4))
2026-11-19T18:31:41.038741397Z   Using cached psycopg2_binary-2.9.13-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl.metadata (4.9 kB)
2026-11-19T18:31:41.045954443Z Collecting psycopg>=3.2.0 (from psycopg[binary]>=3.2.0->-r requirements.txt (line 5))
2026-11-19T18:31:41.046948603Z   Using cached psycopg-3.3.9-py3-none-any.whl.metadata (4.4 kB)
2026-11-19T18:31:41.058441836Z Collecting alembic>=1.13.0 (from -r requirements.txt (line 6))
2026-11-19T18:31:41.059517955Z   Using cached alembic-1.20.1-py3-none-any.whl.metadata (7.3 kB)
2026-11-19T18:31:41.128260629Z Collecting pydantic>=2.7.0 (from -r requirements.txt (line 7))
2026-11-19T18:31:41.129529207Z   Using cached pydantic-2.14.4-py3-none-any.whl.metadata (143 kB)
2026-11-19T18:31:41.140333906Z Collecting pydantic-settings>=2.2.0 (from -r requirements.txt (line 8))
2026-11-19T18:31:41.14138267Z   Using cached pydantic_settings-2.16.3-py3-none-any.whl.metadata (4.0 kB)
2026-11-19T18:31:41.146542865Z Collecting python-jose>=3.3.0 (from python-jose[cryptography]>=3.3.0->-r requirements.txt (line 9))
2026-11-19T18:31:41.147545848Z   Using cached python_jose-3.5.0-py2.py3-none-any.whl.metadata (5.5 kB)
2026-11-19T18:31:41.17144414Z Collecting bcrypt>=4.0.1 (from -r requirements.txt (line 10))
2026-11-19T18:31:41.172712029Z   Using cached bcrypt-5.0.0-cp39-abi3-manylinux_2_34_x86_64.whl.metadata (10 kB)
2026-11-19T18:31:41.179042364Z Collecting python-multipart>=0.0.9 (from -r requirements.txt (line 11))
2026-11-19T18:31:41.180200895Z   Using cached python_multipart-0.0.34-py3-none-any.whl.metadata (6.3 kB)
2026-11-19T18:31:41.187761866Z Collecting httpx>=0.27.0 (from -r requirements.txt (line 12))
2026-11-19T18:31:41.1888024Z   Using cached httpx-0.28.1-py3-none-any.whl.metadata (7.1 kB)
2026-11-19T18:31:41.209890777Z Collecting pyyaml>=6.0.1 (from -r requirements.txt (line 13))
2026-11-19T18:31:41.211067556Z   Using cached pyyaml-6.0.3-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (2.4 kB)
2026-11-19T18:31:41.222480985Z Collecting pypdf>=4.2.0 (from -r requirements.txt (line 14))
2026-11-19T18:31:41.223584707Z   Using cached pypdf-7.1.1-py3-none-any.whl.metadata (7.6 kB)
2026-11-19T18:31:41.293290674Z Collecting reportlab>=4.2.0 (from -r requirements.txt (line 15))
2026-11-19T18:31:41.294455408Z   Using cached reportlab-5.1.0-py3-none-any.whl.metadata (1.6 kB)
2026-11-19T18:31:41.298923392Z Collecting python-docx>=1.1.0 (from -r requirements.txt (line 16))
2026-11-19T18:31:41.299907208Z   Using cached python_docx-1.2.0-py3-none-any.whl.metadata (2.0 kB)
2026-11-19T18:31:41.312106357Z Collecting starlette>=1.6.0 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:31:41.313318513Z   Using cached starlette-1.10.0-py3-none-any.whl.metadata (6.6 kB)
2026-11-19T18:31:41.322387956Z Collecting anyio>=4.1.0 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:31:41.323540689Z   Using cached anyio-4.16.0-py3-none-any.whl.metadata (4.7 kB)
2026-11-19T18:31:41.332989454Z Collecting typing-extensions>=4.8.0 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:31:41.334114414Z   Using cached typing_extensions-4.16.0-py3-none-any.whl.metadata (3.3 kB)
2026-11-19T18:31:41.337889036Z Collecting typing-inspection>=0.4.2 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:31:41.338892152Z   Using cached typing_inspection-0.4.5-py3-none-any.whl.metadata (2.6 kB)
2026-11-19T18:31:41.342282753Z Collecting annotated-doc>=0.0.2 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:31:41.343251383Z   Using cached annotated_doc-0.0.7-py3-none-any.whl.metadata (6.4 kB)
2026-11-19T18:31:41.351678248Z Collecting opentelemetry-api>=1.44.0 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:31:41.352741578Z   Using cached opentelemetry_api-1.45.2-py3-none-any.whl.metadata (1.4 kB)
2026-11-19T18:31:41.360953996Z Collecting click>=7.0 (from uvicorn>=0.30.0->uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:31:41.362054088Z   Using cached click-8.5.1-py3-none-any.whl.metadata (2.6 kB)
2026-11-19T18:31:41.366071617Z Collecting h11>=0.8 (from uvicorn>=0.30.0->uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:31:41.367109321Z   Using cached h11-0.16.0-py3-none-any.whl.metadata (8.3 kB)
2026-11-19T18:31:41.379050021Z Collecting Mako (from alembic>=1.13.0->-r requirements.txt (line 6))
2026-11-19T18:31:41.380081468Z   Using cached mako-1.4.3-py3-none-any.whl.metadata (2.9 kB)
2026-11-19T18:31:41.384851996Z Collecting annotated-types>=0.6.0 (from pydantic>=2.7.0->-r requirements.txt (line 7))
2026-11-19T18:31:41.38580933Z   Using cached annotated_types-0.8.0-py3-none-any.whl.metadata (15 kB)
2026-11-19T18:31:41.9890331Z Collecting pydantic-core==2.50.5 (from pydantic>=2.7.0->-r requirements.txt (line 7))
2026-11-19T18:31:41.990268444Z   Using cached pydantic_core-2.50.5-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl.metadata (6.6 kB)
2026-11-19T18:31:41.998549171Z Collecting python-dotenv>=1.2.2 (from pydantic-settings>=2.2.0->-r requirements.txt (line 8))
2026-11-19T18:31:41.999605976Z   Using cached python_dotenv-1.2.4-py3-none-any.whl.metadata (29 kB)
2026-11-19T18:31:42.009338327Z Collecting ecdsa!=0.15 (from python-jose>=3.3.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 9))
2026-11-19T18:31:42.010354129Z   Using cached ecdsa-0.19.2-py2.py3-none-any.whl.metadata (29 kB)
2026-11-19T18:31:42.017192601Z Collecting rsa!=4.1.1,!=4.4,<5.0,>=4.0 (from python-jose>=3.3.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 9))
2026-11-19T18:31:42.01816237Z   Using cached rsa-4.9.1-py3-none-any.whl.metadata (5.6 kB)
2026-11-19T18:31:42.028352587Z Collecting pyasn1>=0.5.0 (from python-jose>=3.3.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 9))
2026-11-19T18:31:42.029515879Z   Using cached pyasn1-0.6.5-py3-none-any.whl.metadata (8.4 kB)
2026-11-19T18:31:42.04091995Z Collecting certifi (from httpx>=0.27.0->-r requirements.txt (line 12))
2026-11-19T18:31:42.041972257Z   Using cached certifi-2026.10.23-py3-none-any.whl.metadata (2.5 kB)
2026-11-19T18:31:42.049217411Z Collecting httpcore==1.* (from httpx>=0.27.0->-r requirements.txt (line 12))
2026-11-19T18:31:42.050230726Z   Using cached httpcore-1.0.9-py3-none-any.whl.metadata (21 kB)
2026-11-19T18:31:42.057447127Z Collecting idna (from httpx>=0.27.0->-r requirements.txt (line 12))
2026-11-19T18:31:42.058439064Z   Using cached idna-3.20-py3-none-any.whl.metadata (7.2 kB)
2026-11-19T18:31:42.191211767Z Collecting pillow>=9.0.0 (from reportlab>=4.2.0->-r requirements.txt (line 15))
2026-11-19T18:31:42.192443518Z   Using cached pillow-13.0.0-cp314-cp314-manylinux_2_27_x86_64.manylinux_2_28_x86_64.whl.metadata (9.1 kB)
2026-11-19T18:31:42.278564607Z Collecting charset-normalizer (from reportlab>=4.2.0->-r requirements.txt (line 15))
2026-11-19T18:31:42.279890164Z   Using cached charset_normalizer-3.5.2-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (46 kB)
2026-11-19T18:31:42.443784283Z Collecting lxml>=3.1.0 (from python-docx>=1.1.0->-r requirements.txt (line 16))
2026-11-19T18:31:42.444998356Z   Using cached lxml-6.1.3-cp314-cp314-manylinux_2_26_x86_64.manylinux_2_28_x86_64.whl.metadata (3.3 kB)
2026-11-19T18:31:42.453685786Z Collecting six>=1.9.0 (from ecdsa!=0.15->python-jose>=3.3.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 9))
2026-11-19T18:31:42.454764314Z   Using cached six-1.17.0-py2.py3-none-any.whl.metadata (1.7 kB)
2026-11-19T18:31:42.567648624Z Collecting psycopg-binary==3.3.9 (from psycopg[binary]>=3.2.0->-r requirements.txt (line 5))
2026-11-19T18:31:42.568824684Z   Using cached psycopg_binary-3.3.9-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl.metadata (2.7 kB)
2026-11-19T18:31:42.69652498Z Collecting cryptography>=3.4.0 (from python-jose[cryptography]>=3.3.0->-r requirements.txt (line 9))
2026-11-19T18:31:42.697718628Z   Using cached cryptography-50.0.2-cp311-abi3-manylinux_2_34_x86_64.whl.metadata (4.4 kB)
2026-11-19T18:31:42.765121026Z Collecting cffi>=2.0.0 (from cryptography>=3.4.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 9))
2026-11-19T18:31:42.766311772Z   Using cached cffi-2.1.1-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl.metadata (2.5 kB)
2026-11-19T18:31:42.771176692Z Collecting pycparser (from cffi>=2.0.0->cryptography>=3.4.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 9))
2026-11-19T18:31:42.772219303Z   Using cached pycparser-3.12-py3-none-any.whl.metadata (9.7 kB)
2026-11-19T18:31:42.799156008Z Collecting httptools>=0.8.0 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:31:42.800315357Z   Using cached httptools-0.9.0-cp314-cp314-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl.metadata (3.5 kB)
2026-11-19T18:31:42.824838391Z Collecting uvloop>=0.15.1 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:31:42.826013568Z   Using cached uvloop-0.23.0-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (5.1 kB)
2026-11-19T18:31:42.875085823Z Collecting watchfiles>=0.20 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:31:42.87629025Z   Using cached watchfiles-1.3.0-cp310-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (4.9 kB)
2026-11-19T18:31:42.966213033Z Collecting websockets>=13.0 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:31:42.967417536Z   Using cached websockets-17.4-cp314-cp314-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl.metadata (6.3 kB)
2026-11-19T18:31:43.005589905Z Collecting MarkupSafe>=2.0 (from Mako->alembic>=1.13.0->-r requirements.txt (line 6))
2026-11-19T18:31:43.006833681Z   Using cached markupsafe-3.0.4-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (2.7 kB)
2026-11-19T18:31:43.010540912Z Using cached fastapi-0.165.0-py3-none-any.whl (159 kB)
2026-11-19T18:31:43.011643997Z Using cached uvicorn-0.54.0-py3-none-any.whl (87 kB)
2026-11-19T18:31:43.012645939Z Using cached sqlalchemy-2.1.9-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (4.6 MB)
2026-11-19T18:31:43.015190856Z Using cached psycopg2_binary-2.9.13-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl (4.3 MB)
2026-11-19T18:31:43.017647993Z Using cached psycopg-3.3.9-py3-none-any.whl (219 kB)
2026-11-19T18:31:43.018706609Z Using cached alembic-1.20.1-py3-none-any.whl (270 kB)
2026-11-19T18:31:43.01976616Z Using cached pydantic-2.14.4-py3-none-any.whl (494 kB)
2026-11-19T18:31:43.020899248Z Using cached pydantic_core-2.50.5-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl (2.3 MB)
2026-11-19T18:31:43.022642665Z Using cached pydantic_settings-2.16.3-py3-none-any.whl (82 kB)
2026-11-19T18:31:43.023574521Z Using cached python_jose-3.5.0-py2.py3-none-any.whl (34 kB)
2026-11-19T18:31:43.024544781Z Using cached rsa-4.9.1-py3-none-any.whl (34 kB)
2026-11-19T18:31:43.025492385Z Using cached bcrypt-5.0.0-cp39-abi3-manylinux_2_34_x86_64.whl (278 kB)
2026-11-19T18:31:43.026569579Z Using cached python_multipart-0.0.34-py3-none-any.whl (32 kB)
2026-11-19T18:31:43.027505956Z Using cached httpx-0.28.1-py3-none-any.whl (73 kB)
2026-11-19T18:31:43.028463548Z Using cached httpcore-1.0.9-py3-none-any.whl (78 kB)
2026-11-19T18:31:43.02945256Z Using cached pyyaml-6.0.3-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (794 kB)
2026-11-19T18:31:43.030733453Z Using cached pypdf-7.1.1-py3-none-any.whl (421 kB)
2026-11-19T18:31:43.031816455Z Using cached reportlab-5.1.0-py3-none-any.whl (2.0 MB)
2026-11-19T18:31:43.033430407Z Using cached python_docx-1.2.0-py3-none-any.whl (252 kB)
2026-11-19T18:31:43.034445118Z Using cached annotated_doc-0.0.7-py3-none-any.whl (5.3 kB)
2026-11-19T18:31:43.035380917Z Using cached annotated_types-0.8.0-py3-none-any.whl (13 kB)
2026-11-19T18:31:43.036370947Z Using cached anyio-4.16.0-py3-none-any.whl (134 kB)
2026-11-19T18:31:43.037546685Z Using cached click-8.5.1-py3-none-any.whl (126 kB)
2026-11-19T18:31:43.038536128Z Using cached ecdsa-0.19.2-py2.py3-none-any.whl (150 kB)
2026-11-19T18:31:43.039544355Z Using cached h11-0.16.0-py3-none-any.whl (37 kB)
2026-11-19T18:31:43.040478635Z Using cached idna-3.20-py3-none-any.whl (69 kB)
2026-11-19T18:31:43.041460196Z Using cached lxml-6.1.3-cp314-cp314-manylinux_2_26_x86_64.manylinux_2_28_x86_64.whl (5.2 MB)
2026-11-19T18:31:43.044228714Z Using cached opentelemetry_api-1.45.2-py3-none-any.whl (60 kB)
2026-11-19T18:31:43.045212798Z Using cached pillow-13.0.0-cp314-cp314-manylinux_2_27_x86_64.manylinux_2_28_x86_64.whl (7.1 MB)
2026-11-19T18:31:43.048579033Z Using cached psycopg_binary-3.3.9-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl (3.9 MB)
2026-11-19T18:31:43.050971799Z Using cached pyasn1-0.6.5-py3-none-any.whl (84 kB)
2026-11-19T18:31:43.051991918Z Using cached python_dotenv-1.2.4-py3-none-any.whl (23 kB)
2026-11-19T18:31:43.052985076Z Using cached cryptography-50.0.2-cp311-abi3-manylinux_2_34_x86_64.whl (4.8 MB)
2026-11-19T18:31:43.056008536Z Using cached cffi-2.1.1-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl (221 kB)
2026-11-19T18:31:43.057030069Z Using cached six-1.17.0-py2.py3-none-any.whl (11 kB)
2026-11-19T18:31:43.057960567Z Using cached starlette-1.10.0-py3-none-any.whl (80 kB)
2026-11-19T18:31:43.058915339Z Using cached typing_extensions-4.16.0-py3-none-any.whl (45 kB)
2026-11-19T18:31:43.059872855Z Using cached typing_inspection-0.4.5-py3-none-any.whl (14 kB)
2026-11-19T18:31:43.060832659Z Using cached httptools-0.9.0-cp314-cp314-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl (514 kB)
2026-11-19T18:31:43.06195691Z Using cached uvloop-0.23.0-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (4.4 MB)
2026-11-19T18:31:43.064396209Z Using cached watchfiles-1.3.0-cp310-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (458 kB)
2026-11-19T18:31:43.065491561Z Using cached websockets-17.4-cp314-cp314-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl (226 kB)
2026-11-19T18:31:43.066492562Z Using cached certifi-2026.10.23-py3-none-any.whl (135 kB)
2026-11-19T18:31:43.067484109Z Using cached charset_normalizer-3.5.2-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (255 kB)
2026-11-19T18:31:43.068525023Z Using cached mako-1.4.3-py3-none-any.whl (80 kB)
2026-11-19T18:31:43.069512868Z Using cached markupsafe-3.0.4-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (23 kB)
2026-11-19T18:31:43.070473207Z Using cached pycparser-3.12-py3-none-any.whl (62 kB)
2026-11-19T18:31:43.278353047Z Installing collected packages: websockets, uvloop, typing-extensions, six, pyyaml, python-multipart, python-dotenv, pypdf, pycparser, pyasn1, psycopg2-binary, psycopg-binary, psycopg, pillow, MarkupSafe, lxml, idna, httptools, h11, click, charset-normalizer, certifi, bcrypt, annotated-types, annotated-doc, uvicorn, typing-inspection, sqlalchemy, rsa, reportlab, python-docx, pydantic-core, opentelemetry-api, Mako, httpcore, ecdsa, cffi, anyio, watchfiles, starlette, python-jose, pydantic, httpx, cryptography, alembic, pydantic-settings, fastapi
2026-11-19T18:31:48.796310448Z 
2026-11-19T18:31:48.799571312Z Successfully installed Mako-1.4.3 MarkupSafe-3.0.4 alembic-1.20.1 annotated-doc-0.0.7 annotated-types-0.8.0 anyio-4.16.0 bcrypt-5.0.0 certifi-2026.10.23 cffi-2.1.1 charset-normalizer-3.5.2 click-8.5.1 cryptography-50.0.2 ecdsa-0.19.2 fastapi-0.165.0 h11-0.16.0 httpcore-1.0.9 httptools-0.9.0 httpx-0.28.1 idna-3.20 lxml-6.1.3 opentelemetry-api-1.45.2 pillow-13.0.0 psycopg-3.3.9 psycopg-binary-3.3.9 psycopg2-binary-2.9.13 pyasn1-0.6.5 pycparser-3.12 pydantic-2.14.4 pydantic-core-2.50.5 pydantic-settings-2.16.3 pypdf-7.1.1 python-docx-1.2.0 python-dotenv-1.2.4 python-jose-3.5.0 python-multipart-0.0.34 pyyaml-6.0.3 reportlab-5.1.0 rsa-4.9.1 six-1.17.0 sqlalchemy-2.1.9 starlette-1.10.0 typing-extensions-4.16.0 typing-inspection-0.4.5 uvicorn-0.54.0 uvloop-0.23.0 watchfiles-1.3.0 websockets-17.4
2026-11-19T18:31:48.800507505Z 
2026-11-19T18:31:48.800512965Z [notice] A new release of pip is available: 26.2.2 -> 26.3
2026-11-19T18:31:48.800514572Z [notice] To update, run: pip install --upgrade pip
2026-11-19T18:31:50.22734632Z ==> Uploading build...
2026-11-19T18:31:56.892123262Z ==> Uploaded in 5.2s. Compression took 1.5s
2026-11-19T18:31:56.896554464Z ==> Build successful 🎉
2026-11-19T18:31:58.17631356Z ==> Deploying...
2026-11-19T18:31:58.280297926Z ==> Setting WEB_CONCURRENCY=1 by default, based on available CPUs in the instance
2026-11-19T18:32:11.729862287Z ==> Running 'uvicorn app.main:app --host 0.0.0.0 --port $PORT'
2026-11-19T18:32:25.33458907Z Traceback (most recent call last):
2026-11-19T18:32:25.334724409Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/networks.py", line 1040, in import_email_validator
2026-11-19T18:32:25.334736089Z     import email_validator
2026-11-19T18:32:25.33474291Z ModuleNotFoundError: No module named 'email_validator'
2026-11-19T18:32:25.334788153Z 
2026-11-19T18:32:25.334800953Z The above exception was the direct cause of the following exception:
2026-11-19T18:32:25.334806414Z 
2026-11-19T18:32:25.334812274Z Traceback (most recent call last):
2026-11-19T18:32:25.337428556Z   File "/opt/render/project/src/.venv/bin/uvicorn", line 6, in <module>
2026-11-19T18:32:25.337442127Z     sys.exit(main())
2026-11-19T18:32:25.337447957Z              ~~~~^^
2026-11-19T18:32:25.337453938Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 1653, in __call__
2026-11-19T18:32:25.337459738Z     return self.main(*args, **kwargs)
2026-11-19T18:32:25.337465098Z            ~~~~~~~~~^^^^^^^^^^^^^^^^^
2026-11-19T18:32:25.337470429Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 1560, in main
2026-11-19T18:32:25.337476449Z     rv = self.invoke(ctx)
2026-11-19T18:32:25.337481599Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 1414, in invoke
2026-11-19T18:32:25.33748788Z     return ctx.invoke(self.callback, **ctx.params)
2026-11-19T18:32:25.33749333Z            ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:32:25.33749816Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 911, in invoke
2026-11-19T18:32:25.337502721Z     return callback(*args, **kwargs)
2026-11-19T18:32:25.337508271Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/main.py", line 448, in main
2026-11-19T18:32:25.337513741Z     run(
2026-11-19T18:32:25.337519032Z     ~~~^
2026-11-19T18:32:25.337524512Z         app,
2026-11-19T18:32:25.337529212Z         ^^^^
2026-11-19T18:32:25.337532722Z     ...<49 lines>...
2026-11-19T18:32:25.337536253Z         reset_contextvars=reset_contextvars,
2026-11-19T18:32:25.337539713Z         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:32:25.337543153Z     )
2026-11-19T18:32:25.337546603Z     ^
2026-11-19T18:32:25.337550074Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/main.py", line 620, in run
2026-11-19T18:32:25.337553524Z     config.load_app()
2026-11-19T18:32:25.337557234Z     ~~~~~~~~~~~~~~~^^
2026-11-19T18:32:25.337560754Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/config.py", line 434, in load_app
2026-11-19T18:32:25.337564195Z     return import_from_string(self.app)
2026-11-19T18:32:25.337568075Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/importer.py", line 19, in import_from_string
2026-11-19T18:32:25.337571465Z     module = importlib.import_module(module_str)
2026-11-19T18:32:25.337575095Z   File "/opt/render/project/python/Python-3.14.10/lib/python3.14/importlib/__init__.py", line 88, in import_module
2026-11-19T18:32:25.337578645Z     return _bootstrap._gcd_import(name[level:], package, level)
2026-11-19T18:32:25.337582045Z            ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:32:25.337585606Z   File "<frozen importlib._bootstrap>", line 1406, in _gcd_import
2026-11-19T18:32:25.337589066Z   File "<frozen importlib._bootstrap>", line 1371, in _find_and_load
2026-11-19T18:32:25.337592556Z   File "<frozen importlib._bootstrap>", line 1342, in _find_and_load_unlocked
2026-11-19T18:32:25.337606127Z   File "<frozen importlib._bootstrap>", line 938, in _load_unlocked
2026-11-19T18:32:25.337608697Z   File "<frozen importlib._bootstrap_external>", line 763, in exec_module
2026-11-19T18:32:25.337623558Z   File "<frozen importlib._bootstrap>", line 491, in _call_with_frames_removed
2026-11-19T18:32:25.337626268Z   File "/opt/render/project/src/backend/app/main.py", line 5, in <module>
2026-11-19T18:32:25.337628588Z     from app.routers import auth, uploads, dashboard, test_runs, reports, settings as settings_router
2026-11-19T18:32:25.337631419Z   File "/opt/render/project/src/backend/app/routers/auth.py", line 7, in <module>
2026-11-19T18:32:25.337633719Z     from app.schemas.user import UserCreate, UserLogin, ForgotPasswordRequest, ProfileUpdate, AuthResponse, UserOut
2026-11-19T18:32:25.337636089Z   File "/opt/render/project/src/backend/app/schemas/user.py", line 5, in <module>
2026-11-19T18:32:25.337638449Z     class UserBase(BaseModel):
2026-11-19T18:32:25.337640739Z         name: str
2026-11-19T18:32:25.337643459Z         email: EmailStr
2026-11-19T18:32:25.337646429Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_model_construction.py", line 253, in __new__
2026-11-19T18:32:25.33764878Z     complete_model_class(
2026-11-19T18:32:25.33765109Z     ~~~~~~~~~~~~~~~~~~~~^
2026-11-19T18:32:25.33765341Z         cls,
2026-11-19T18:32:25.33765569Z         ^^^^
2026-11-19T18:32:25.33765794Z     ...<3 lines>...
2026-11-19T18:32:25.33766041Z         create_model_module=_create_model_module,
2026-11-19T18:32:25.337662821Z         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:32:25.337666171Z     )
2026-11-19T18:32:25.337670021Z     ^
2026-11-19T18:32:25.337673791Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_model_construction.py", line 628, in complete_model_class
2026-11-19T18:32:25.337677642Z     schema = gen_schema.generate_schema(cls)
2026-11-19T18:32:25.337681662Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_generate_schema.py", line 871, in generate_schema
2026-11-19T18:32:25.337685422Z     schema = self._generate_schema_inner(obj, origin)
2026-11-19T18:32:25.337688992Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_generate_schema.py", line 1176, in _generate_schema_inner
2026-11-19T18:32:25.337692663Z     return self._model_schema(obj)
2026-11-19T18:32:25.337696483Z            ~~~~~~~~~~~~~~~~~~^^^^^
2026-11-19T18:32:25.337700103Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_generate_schema.py", line 998, in _model_schema
2026-11-19T18:32:25.337703753Z     {k: self._generate_md_field_schema(k, v, decorators) for k, v in fields.items()},
2026-11-19T18:32:25.337707193Z         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^
2026-11-19T18:32:25.337711464Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_generate_schema.py", line 1308, in _generate_md_field_schema
2026-11-19T18:32:25.337714944Z     schema, metadata = self._common_field_schema(name, field_info, decorators)
2026-11-19T18:32:25.337718714Z                        ~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:32:25.337722264Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_generate_schema.py", line 1365, in _common_field_schema
2026-11-19T18:32:25.337725854Z     schema = self._apply_annotations(
2026-11-19T18:32:25.337729365Z         source_type,
2026-11-19T18:32:25.337733025Z         annotations + validators_from_decorators,
2026-11-19T18:32:25.337744456Z     )
2026-11-19T18:32:25.337760947Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_generate_schema.py", line 2380, in _apply_annotations
2026-11-19T18:32:25.337779388Z     schema = inner_handler(source_type)
2026-11-19T18:32:25.337783038Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_generate_schema.py", line 2366, in inner_handler
2026-11-19T18:32:25.337786148Z     schema = self._generate_schema_from_get_schema_method(obj, source_type)
2026-11-19T18:32:25.337792309Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/_internal/_generate_schema.py", line 1058, in _generate_schema_from_get_schema_method
2026-11-19T18:32:25.337795309Z     schema = get_schema(
2026-11-19T18:32:25.337798199Z         source, CallbackGetCoreSchemaHandler(self._generate_schema_inner, self, ref_mode=ref_mode)
2026-11-19T18:32:25.337801259Z     )
2026-11-19T18:32:25.337804739Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/networks.py", line 1080, in __get_pydantic_core_schema__
2026-11-19T18:32:25.337807899Z     import_email_validator()
2026-11-19T18:32:25.33781108Z     ~~~~~~~~~~~~~~~~~~~~~~^^
2026-11-19T18:32:25.33781519Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/pydantic/networks.py", line 1042, in import_email_validator
2026-11-19T18:32:25.33781875Z     raise ImportError("email-validator is not installed, run `pip install 'pydantic[email]'`") from e
2026-11-19T18:32:25.33782282Z ImportError: email-validator is not installed, run `pip install 'pydantic[email]'`
2026-11-19T18:32:28.209582319Z ==> Exited with status 1
2026-11-19T18:32:28.213018311Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
2026-11-19T18:32:28.647899905Z ==> Instance srv-dbvjp8o8v5cc73aslv9g-zb698 restarted
2026-11-19T18:32:33.941647614Z ==> Running 'uvicorn app.main:app --host 0.0.0.0 --port $PORT'