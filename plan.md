2026-11-19T18:15:07.538780405Z ==> Cloning from https://github.com/subhajitm6/apiforge
2026-11-19T18:15:08.785054182Z ==> Checking out commit 36aa0305b527284726066fcac05bb060b7d7e9c4 in branch main
2026-11-19T18:15:10.207692696Z ==> Using Python version 3.14.10 (default)
2026-11-19T18:15:10.207707978Z ==> Docs on specifying a Python version: https://render.com/docs/python-version
2026-11-19T18:15:10.207825131Z ==> Installing Python version 3.14.10...
2026-11-19T18:15:17.170077815Z ==> Using Poetry version 2.1.3 (default)
2026-11-19T18:15:17.215027558Z ==> Docs on specifying a Poetry version: https://render.com/docs/poetry-version
2026-11-19T18:15:17.273896708Z ==> Running build command 'pip install -r requirements.txt'...
2026-11-19T18:15:17.882230399Z Collecting fastapi>=0.115.0 (from -r requirements.txt (line 1))
2026-11-19T18:15:17.964980338Z   Downloading fastapi-0.165.0-py3-none-any.whl.metadata (27 kB)
2026-11-19T18:15:18.004391841Z Collecting uvicorn>=0.30.0 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:15:18.014326709Z   Downloading uvicorn-0.54.0-py3-none-any.whl.metadata (6.6 kB)
2026-11-19T18:15:18.316378083Z Collecting sqlalchemy>=2.0.30 (from -r requirements.txt (line 3))
2026-11-19T18:15:18.328939014Z   Downloading sqlalchemy-2.1.9-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (9.7 kB)
2026-11-19T18:15:18.396056336Z Collecting psycopg2-binary>=2.9.9 (from -r requirements.txt (line 4))
2026-11-19T18:15:18.40632573Z   Downloading psycopg2_binary-2.9.13-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl.metadata (4.9 kB)
2026-11-19T18:15:18.428967226Z Collecting alembic>=1.13.0 (from -r requirements.txt (line 5))
2026-11-19T18:15:18.438214854Z   Downloading alembic-1.20.1-py3-none-any.whl.metadata (7.3 kB)
2026-11-19T18:15:18.536218874Z Collecting pydantic>=2.7.0 (from -r requirements.txt (line 6))
2026-11-19T18:15:18.545182698Z   Downloading pydantic-2.14.4-py3-none-any.whl.metadata (143 kB)
2026-11-19T18:15:18.586931127Z Collecting pydantic-settings>=2.2.0 (from -r requirements.txt (line 7))
2026-11-19T18:15:18.595723052Z   Downloading pydantic_settings-2.16.3-py3-none-any.whl.metadata (4.0 kB)
2026-11-19T18:15:18.616606389Z Collecting python-jose>=3.3.0 (from python-jose[cryptography]>=3.3.0->-r requirements.txt (line 8))
2026-11-19T18:15:18.625170282Z   Downloading python_jose-3.5.0-py2.py3-none-any.whl.metadata (5.5 kB)
2026-11-19T18:15:18.642337447Z Collecting passlib>=1.7.4 (from passlib[bcrypt]>=1.7.4->-r requirements.txt (line 9))
2026-11-19T18:15:18.651807937Z   Downloading passlib-1.7.4-py2.py3-none-any.whl.metadata (1.7 kB)
2026-11-19T18:15:18.68953621Z Collecting bcrypt>=4.0.1 (from -r requirements.txt (line 10))
2026-11-19T18:15:18.700302271Z   Downloading bcrypt-5.0.0-cp39-abi3-manylinux_2_34_x86_64.whl.metadata (10 kB)
2026-11-19T18:15:18.718794132Z Collecting python-multipart>=0.0.9 (from -r requirements.txt (line 11))
2026-11-19T18:15:18.729197257Z   Downloading python_multipart-0.0.34-py3-none-any.whl.metadata (6.3 kB)
2026-11-19T18:15:18.758211488Z Collecting httpx>=0.27.0 (from -r requirements.txt (line 12))
2026-11-19T18:15:18.768801093Z   Downloading httpx-0.28.1-py3-none-any.whl.metadata (7.1 kB)
2026-11-19T18:15:18.803796668Z Collecting pyyaml>=6.0.1 (from -r requirements.txt (line 13))
2026-11-19T18:15:18.815139079Z   Downloading pyyaml-6.0.3-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (2.4 kB)
2026-11-19T18:15:18.838764592Z Collecting pypdf>=4.2.0 (from -r requirements.txt (line 14))
2026-11-19T18:15:18.847950892Z   Downloading pypdf-7.1.1-py3-none-any.whl.metadata (7.6 kB)
2026-11-19T18:15:18.959085408Z Collecting reportlab>=4.2.0 (from -r requirements.txt (line 15))
2026-11-19T18:15:18.968139685Z   Downloading reportlab-5.1.0-py3-none-any.whl.metadata (1.6 kB)
2026-11-19T18:15:19.0015468Z Collecting starlette>=1.6.0 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:15:19.010803477Z   Downloading starlette-1.10.0-py3-none-any.whl.metadata (6.6 kB)
2026-11-19T18:15:19.038064951Z Collecting anyio>=4.1.0 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:15:19.046730176Z   Downloading anyio-4.16.0-py3-none-any.whl.metadata (4.7 kB)
2026-11-19T18:15:19.072011654Z Collecting typing-extensions>=4.8.0 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:15:19.083830931Z   Downloading typing_extensions-4.16.0-py3-none-any.whl.metadata (3.3 kB)
2026-11-19T18:15:19.10257725Z Collecting typing-inspection>=0.4.2 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:15:19.111734356Z   Downloading typing_inspection-0.4.5-py3-none-any.whl.metadata (2.6 kB)
2026-11-19T18:15:19.1281074Z Collecting annotated-doc>=0.0.2 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:15:19.137995075Z   Downloading annotated_doc-0.0.7-py3-none-any.whl.metadata (6.4 kB)
2026-11-19T18:15:19.161583014Z Collecting opentelemetry-api>=1.44.0 (from fastapi>=0.115.0->-r requirements.txt (line 1))
2026-11-19T18:15:19.171452726Z   Downloading opentelemetry_api-1.45.2-py3-none-any.whl.metadata (1.4 kB)
2026-11-19T18:15:19.197265267Z Collecting click>=7.0 (from uvicorn>=0.30.0->uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:15:19.206277282Z   Downloading click-8.5.1-py3-none-any.whl.metadata (2.6 kB)
2026-11-19T18:15:19.23240611Z Collecting h11>=0.8 (from uvicorn>=0.30.0->uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:15:19.242329386Z   Downloading h11-0.16.0-py3-none-any.whl.metadata (8.3 kB)
2026-11-19T18:15:19.276999031Z Collecting Mako (from alembic>=1.13.0->-r requirements.txt (line 5))
2026-11-19T18:15:19.286121977Z   Downloading mako-1.4.3-py3-none-any.whl.metadata (2.9 kB)
2026-11-19T18:15:19.317423293Z Collecting annotated-types>=0.6.0 (from pydantic>=2.7.0->-r requirements.txt (line 6))
2026-11-19T18:15:19.326754139Z   Downloading annotated_types-0.8.0-py3-none-any.whl.metadata (15 kB)
2026-11-19T18:15:19.945224187Z Collecting pydantic-core==2.50.5 (from pydantic>=2.7.0->-r requirements.txt (line 6))
2026-11-19T18:15:19.955888988Z   Downloading pydantic_core-2.50.5-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl.metadata (6.6 kB)
2026-11-19T18:15:20.081530515Z Collecting python-dotenv>=1.2.2 (from pydantic-settings>=2.2.0->-r requirements.txt (line 7))
2026-11-19T18:15:20.090075367Z   Downloading python_dotenv-1.2.4-py3-none-any.whl.metadata (29 kB)
2026-11-19T18:15:20.120366394Z Collecting ecdsa!=0.15 (from python-jose>=3.3.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 8))
2026-11-19T18:15:20.130331188Z   Downloading ecdsa-0.19.2-py2.py3-none-any.whl.metadata (29 kB)
2026-11-19T18:15:20.158471526Z Collecting rsa!=4.1.1,!=4.4,<5.0,>=4.0 (from python-jose>=3.3.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 8))
2026-11-19T18:15:20.167917963Z   Downloading rsa-4.9.1-py3-none-any.whl.metadata (5.6 kB)
2026-11-19T18:15:20.199844892Z Collecting pyasn1>=0.5.0 (from python-jose>=3.3.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 8))
2026-11-19T18:15:20.210361319Z   Downloading pyasn1-0.6.5-py3-none-any.whl.metadata (8.4 kB)
2026-11-19T18:15:20.251830739Z Collecting certifi (from httpx>=0.27.0->-r requirements.txt (line 12))
2026-11-19T18:15:20.260847389Z   Downloading certifi-2026.10.23-py3-none-any.whl.metadata (2.5 kB)
2026-11-19T18:15:20.288378169Z Collecting httpcore==1.* (from httpx>=0.27.0->-r requirements.txt (line 12))
2026-11-19T18:15:20.299355968Z   Downloading httpcore-1.0.9-py3-none-any.whl.metadata (21 kB)
2026-11-19T18:15:20.331274155Z Collecting idna (from httpx>=0.27.0->-r requirements.txt (line 12))
2026-11-19T18:15:20.340227016Z   Downloading idna-3.20-py3-none-any.whl.metadata (7.2 kB)
2026-11-19T18:15:20.491217443Z Collecting pillow>=9.0.0 (from reportlab>=4.2.0->-r requirements.txt (line 15))
2026-11-19T18:15:20.500148104Z   Downloading pillow-13.0.0-cp314-cp314-manylinux_2_27_x86_64.manylinux_2_28_x86_64.whl.metadata (9.1 kB)
2026-11-19T18:15:20.633337618Z Collecting charset-normalizer (from reportlab>=4.2.0->-r requirements.txt (line 15))
2026-11-19T18:15:20.645017308Z   Downloading charset_normalizer-3.5.2-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (46 kB)
2026-11-19T18:15:20.683380307Z Collecting six>=1.9.0 (from ecdsa!=0.15->python-jose>=3.3.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 8))
2026-11-19T18:15:20.693152988Z   Downloading six-1.17.0-py2.py3-none-any.whl.metadata (1.7 kB)
2026-11-19T18:15:20.847360973Z Collecting cryptography>=3.4.0 (from python-jose[cryptography]>=3.3.0->-r requirements.txt (line 8))
2026-11-19T18:15:20.856734191Z   Downloading cryptography-50.0.2-cp311-abi3-manylinux_2_34_x86_64.whl.metadata (4.4 kB)
2026-11-19T18:15:20.954846425Z Collecting cffi>=2.0.0 (from cryptography>=3.4.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 8))
2026-11-19T18:15:20.964439953Z   Downloading cffi-2.1.1-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl.metadata (2.5 kB)
2026-11-19T18:15:20.990658469Z Collecting pycparser (from cffi>=2.0.0->cryptography>=3.4.0->python-jose[cryptography]>=3.3.0->-r requirements.txt (line 8))
2026-11-19T18:15:21.000661691Z   Downloading pycparser-3.12-py3-none-any.whl.metadata (9.7 kB)
2026-11-19T18:15:21.042803462Z Collecting httptools>=0.8.0 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:15:21.052663456Z   Downloading httptools-0.9.0-cp314-cp314-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl.metadata (3.5 kB)
2026-11-19T18:15:21.093065317Z Collecting uvloop>=0.15.1 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:15:21.103123803Z   Downloading uvloop-0.23.0-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (5.1 kB)
2026-11-19T18:15:21.16582636Z Collecting watchfiles>=0.20 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:15:21.174775079Z   Downloading watchfiles-1.3.0-cp310-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (4.9 kB)
2026-11-19T18:15:21.288843951Z Collecting websockets>=13.0 (from uvicorn[standard]>=0.30.0->-r requirements.txt (line 2))
2026-11-19T18:15:21.297890396Z   Downloading websockets-17.4-cp314-cp314-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl.metadata (6.3 kB)
2026-11-19T18:15:21.351702732Z Collecting MarkupSafe>=2.0 (from Mako->alembic>=1.13.0->-r requirements.txt (line 5))
2026-11-19T18:15:21.362553162Z   Downloading markupsafe-3.0.4-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl.metadata (2.7 kB)
2026-11-19T18:15:21.375548972Z Downloading fastapi-0.165.0-py3-none-any.whl (159 kB)
2026-11-19T18:15:21.403318983Z Downloading uvicorn-0.54.0-py3-none-any.whl (87 kB)
2026-11-19T18:15:21.428240526Z Downloading sqlalchemy-2.1.9-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (4.6 MB)
2026-11-19T18:15:21.642581465Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.6/4.6 MB 22.9 MB/s  0:00:00
2026-11-19T18:15:21.651775202Z Downloading psycopg2_binary-2.9.13-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl (4.3 MB)
2026-11-19T18:15:21.740249936Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.3/4.3 MB 47.9 MB/s  0:00:00
2026-11-19T18:15:21.749146525Z Downloading alembic-1.20.1-py3-none-any.whl (270 kB)
2026-11-19T18:15:21.763054544Z Downloading pydantic-2.14.4-py3-none-any.whl (494 kB)
2026-11-19T18:15:21.778027717Z Downloading pydantic_core-2.50.5-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl (2.3 MB)
2026-11-19T18:15:21.821867929Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2.3/2.3 MB 51.5 MB/s  0:00:00
2026-11-19T18:15:21.830904074Z Downloading pydantic_settings-2.16.3-py3-none-any.whl (82 kB)
2026-11-19T18:15:21.841875523Z Downloading python_jose-3.5.0-py2.py3-none-any.whl (34 kB)
2026-11-19T18:15:21.852565952Z Downloading rsa-4.9.1-py3-none-any.whl (34 kB)
2026-11-19T18:15:21.86495989Z Downloading passlib-1.7.4-py2.py3-none-any.whl (525 kB)
2026-11-19T18:15:21.871308411Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 525.6/525.6 kB 66.2 MB/s  0:00:00
2026-11-19T18:15:21.880291558Z Downloading bcrypt-5.0.0-cp39-abi3-manylinux_2_34_x86_64.whl (278 kB)
2026-11-19T18:15:21.894637961Z Downloading python_multipart-0.0.34-py3-none-any.whl (32 kB)
2026-11-19T18:15:21.909299804Z Downloading httpx-0.28.1-py3-none-any.whl (73 kB)
2026-11-19T18:15:21.922655387Z Downloading httpcore-1.0.9-py3-none-any.whl (78 kB)
2026-11-19T18:15:21.933767709Z Downloading pyyaml-6.0.3-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (794 kB)
2026-11-19T18:15:21.944890815Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 794.2/794.2 kB 64.6 MB/s  0:00:00
2026-11-19T18:15:21.955871499Z Downloading pypdf-7.1.1-py3-none-any.whl (421 kB)
2026-11-19T18:15:21.970434451Z Downloading reportlab-5.1.0-py3-none-any.whl (2.0 MB)
2026-11-19T18:15:21.992278263Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2.0/2.0 MB 91.0 MB/s  0:00:00
2026-11-19T18:15:22.001361816Z Downloading annotated_doc-0.0.7-py3-none-any.whl (5.3 kB)
2026-11-19T18:15:22.012040514Z Downloading annotated_types-0.8.0-py3-none-any.whl (13 kB)
2026-11-19T18:15:22.022608251Z Downloading anyio-4.16.0-py3-none-any.whl (134 kB)
2026-11-19T18:15:22.033154281Z Downloading click-8.5.1-py3-none-any.whl (126 kB)
2026-11-19T18:15:22.043584437Z Downloading ecdsa-0.19.2-py2.py3-none-any.whl (150 kB)
2026-11-19T18:15:22.054282226Z Downloading h11-0.16.0-py3-none-any.whl (37 kB)
2026-11-19T18:15:22.064565064Z Downloading idna-3.20-py3-none-any.whl (69 kB)
2026-11-19T18:15:22.074782852Z Downloading opentelemetry_api-1.45.2-py3-none-any.whl (60 kB)
2026-11-19T18:15:22.085592297Z Downloading pillow-13.0.0-cp314-cp314-manylinux_2_27_x86_64.manylinux_2_28_x86_64.whl (7.1 MB)
2026-11-19T18:15:22.161273436Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 7.1/7.1 MB 94.4 MB/s  0:00:00
2026-11-19T18:15:22.178365922Z Downloading pyasn1-0.6.5-py3-none-any.whl (84 kB)
2026-11-19T18:15:22.189956304Z Downloading python_dotenv-1.2.4-py3-none-any.whl (23 kB)
2026-11-19T18:15:22.200600071Z Downloading cryptography-50.0.2-cp311-abi3-manylinux_2_34_x86_64.whl (4.8 MB)
2026-11-19T18:15:22.241279175Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.8/4.8 MB 116.2 MB/s  0:00:00
2026-11-19T18:15:22.258652279Z Downloading cffi-2.1.1-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.whl (221 kB)
2026-11-19T18:15:22.270204335Z Downloading six-1.17.0-py2.py3-none-any.whl (11 kB)
2026-11-19T18:15:22.282366709Z Downloading starlette-1.10.0-py3-none-any.whl (80 kB)
2026-11-19T18:15:22.294741865Z Downloading typing_extensions-4.16.0-py3-none-any.whl (45 kB)
2026-11-19T18:15:22.307660951Z Downloading typing_inspection-0.4.5-py3-none-any.whl (14 kB)
2026-11-19T18:15:22.323228961Z Downloading httptools-0.9.0-cp314-cp314-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl (514 kB)
2026-11-19T18:15:22.344446411Z Downloading uvloop-0.23.0-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (4.4 MB)
2026-11-19T18:15:22.376304505Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.4/4.4 MB 147.9 MB/s  0:00:00
2026-11-19T18:15:22.385601721Z Downloading watchfiles-1.3.0-cp310-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (458 kB)
2026-11-19T18:15:22.400020151Z Downloading websockets-17.4-cp314-cp314-manylinux1_x86_64.manylinux_2_28_x86_64.manylinux_2_5_x86_64.whl (226 kB)
2026-11-19T18:15:22.412931164Z Downloading certifi-2026.10.23-py3-none-any.whl (135 kB)
2026-11-19T18:15:22.425460925Z Downloading charset_normalizer-3.5.2-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (255 kB)
2026-11-19T18:15:22.437322069Z Downloading mako-1.4.3-py3-none-any.whl (80 kB)
2026-11-19T18:15:22.451136454Z Downloading markupsafe-3.0.4-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (23 kB)
2026-11-19T18:15:22.462998452Z Downloading pycparser-3.12-py3-none-any.whl (62 kB)
2026-11-19T18:15:22.674254884Z Installing collected packages: passlib, websockets, uvloop, typing-extensions, six, pyyaml, python-multipart, python-dotenv, pypdf, pycparser, pyasn1, psycopg2-binary, pillow, MarkupSafe, idna, httptools, h11, click, charset-normalizer, certifi, bcrypt, annotated-types, annotated-doc, uvicorn, typing-inspection, sqlalchemy, rsa, reportlab, pydantic-core, opentelemetry-api, Mako, httpcore, ecdsa, cffi, anyio, watchfiles, starlette, python-jose, pydantic, httpx, cryptography, alembic, pydantic-settings, fastapi
2026-11-19T18:15:27.696889685Z 
2026-11-19T18:15:27.699835248Z Successfully installed Mako-1.4.3 MarkupSafe-3.0.4 alembic-1.20.1 annotated-doc-0.0.7 annotated-types-0.8.0 anyio-4.16.0 bcrypt-5.0.0 certifi-2026.10.23 cffi-2.1.1 charset-normalizer-3.5.2 click-8.5.1 cryptography-50.0.2 ecdsa-0.19.2 fastapi-0.165.0 h11-0.16.0 httpcore-1.0.9 httptools-0.9.0 httpx-0.28.1 idna-3.20 opentelemetry-api-1.45.2 passlib-1.7.4 pillow-13.0.0 psycopg2-binary-2.9.13 pyasn1-0.6.5 pycparser-3.12 pydantic-2.14.4 pydantic-core-2.50.5 pydantic-settings-2.16.3 pypdf-7.1.1 python-dotenv-1.2.4 python-jose-3.5.0 python-multipart-0.0.34 pyyaml-6.0.3 reportlab-5.1.0 rsa-4.9.1 six-1.17.0 sqlalchemy-2.1.9 starlette-1.10.0 typing-extensions-4.16.0 typing-inspection-0.4.5 uvicorn-0.54.0 uvloop-0.23.0 watchfiles-1.3.0 websockets-17.4
2026-11-19T18:15:27.700751789Z 
2026-11-19T18:15:27.700765093Z [notice] A new release of pip is available: 26.2.2 -> 26.3
2026-11-19T18:15:27.700768129Z [notice] To update, run: pip install --upgrade pip
2026-11-19T18:15:29.273537841Z ==> Uploading build...
2026-11-19T18:15:41.48315567Z ==> Uploaded in 10.0s. Compression took 2.2s
2026-11-19T18:15:41.486698708Z ==> Build successful 🎉
2026-11-19T18:15:42.755241102Z ==> Deploying...
2026-11-19T18:15:42.850722084Z ==> Setting WEB_CONCURRENCY=1 by default, based on available CPUs in the instance
2026-11-19T18:15:52.504082179Z ==> Running 'uvicorn app.main:app --host 0.0.0.0 --port $PORT'
2026-11-19T18:16:06.452387489Z ==> Exited with status 1
2026-11-19T18:16:06.456569817Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
2026-11-19T18:16:06.48638809Z ==> Instance srv-dbvjp8o8v5cc73aslv9g-g4f2l restarted
2026-11-19T18:16:09.712144941Z ==> Running 'uvicorn app.main:app --host 0.0.0.0 --port $PORT'
2026-11-19T18:16:03.597823439Z Traceback (most recent call last):
2026-11-19T18:16:03.599487614Z   File "/opt/render/project/src/.venv/bin/uvicorn", line 6, in <module>
2026-11-19T18:16:03.599505214Z     sys.exit(main())
2026-11-19T18:16:03.599510074Z              ~~~~^^
2026-11-19T18:16:03.599514034Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 1653, in __call__
2026-11-19T18:16:03.599520604Z     return self.main(*args, **kwargs)
2026-11-19T18:16:03.599526394Z            ~~~~~~~~~^^^^^^^^^^^^^^^^^
2026-11-19T18:16:03.599531654Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 1560, in main
2026-11-19T18:16:03.599537874Z     rv = self.invoke(ctx)
2026-11-19T18:16:03.599542994Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 1414, in invoke
2026-11-19T18:16:03.599548814Z     return ctx.invoke(self.callback, **ctx.params)
2026-11-19T18:16:03.599554184Z            ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:16:03.599559764Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 911, in invoke
2026-11-19T18:16:03.599565405Z     return callback(*args, **kwargs)
2026-11-19T18:16:03.599569045Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/main.py", line 448, in main
2026-11-19T18:16:03.599572525Z     run(
2026-11-19T18:16:03.599576125Z     ~~~^
2026-11-19T18:16:03.599579655Z         app,
2026-11-19T18:16:03.599583105Z         ^^^^
2026-11-19T18:16:03.599586725Z     ...<49 lines>...
2026-11-19T18:16:03.599590215Z         reset_contextvars=reset_contextvars,
2026-11-19T18:16:03.599593785Z         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:16:03.599597185Z     )
2026-11-19T18:16:03.599600585Z     ^
2026-11-19T18:16:03.599604075Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/main.py", line 620, in run
2026-11-19T18:16:03.599607545Z     config.load_app()
2026-11-19T18:16:03.599610955Z     ~~~~~~~~~~~~~~~^^
2026-11-19T18:16:03.599614465Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/config.py", line 434, in load_app
2026-11-19T18:16:03.599617855Z     return import_from_string(self.app)
2026-11-19T18:16:03.599621916Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/importer.py", line 22, in import_from_string
2026-11-19T18:16:03.599625305Z     raise exc from None
2026-11-19T18:16:03.599628756Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/importer.py", line 19, in import_from_string
2026-11-19T18:16:03.599632136Z     module = importlib.import_module(module_str)
2026-11-19T18:16:03.599635566Z   File "/opt/render/project/python/Python-3.14.10/lib/python3.14/importlib/__init__.py", line 88, in import_module
2026-11-19T18:16:03.599639016Z     return _bootstrap._gcd_import(name[level:], package, level)
2026-11-19T18:16:03.599642466Z            ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:16:03.599646146Z   File "<frozen importlib._bootstrap>", line 1406, in _gcd_import
2026-11-19T18:16:03.599649566Z   File "<frozen importlib._bootstrap>", line 1371, in _find_and_load
2026-11-19T18:16:03.599653006Z   File "<frozen importlib._bootstrap>", line 1342, in _find_and_load_unlocked
2026-11-19T18:16:03.599656386Z   File "<frozen importlib._bootstrap>", line 938, in _load_unlocked
2026-11-19T18:16:03.599659746Z   File "<frozen importlib._bootstrap_external>", line 763, in exec_module
2026-11-19T18:16:03.599663146Z   File "<frozen importlib._bootstrap>", line 491, in _call_with_frames_removed
2026-11-19T18:16:03.599710997Z   File "/opt/render/project/src/backend/app/main.py", line 4, in <module>
2026-11-19T18:16:03.599720597Z     from app.core.database import Base, engine
2026-11-19T18:16:03.599724987Z   File "/opt/render/project/src/backend/app/core/database.py", line 5, in <module>
2026-11-19T18:16:03.599728797Z     engine = create_engine(
2026-11-19T18:16:03.599732587Z         settings.DATABASE_URL,
2026-11-19T18:16:03.599736467Z         pool_pre_ping=True,
2026-11-19T18:16:03.599739967Z         echo=False
2026-11-19T18:16:03.599742317Z     )
2026-11-19T18:16:03.599744857Z   File "<sqlalchemy generated warned() wrapper for sqlalchemy.engine.create.create_engine>", line 2, in create_engine
2026-11-19T18:16:03.599747857Z     return target(fn, url, **kwargs)
2026-11-19T18:16:03.599750227Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/sqlalchemy/util/deprecations.py", line 281, in warned
2026-11-19T18:16:03.599752777Z     return fn(*args, **kwargs)  # type: ignore[no-any-return]
2026-11-19T18:16:03.599755158Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/sqlalchemy/engine/create.py", line 602, in create_engine
2026-11-19T18:16:03.599757467Z     dbapi = dbapi_meth(**dbapi_args)
2026-11-19T18:16:03.599760527Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/sqlalchemy/dialects/postgresql/psycopg.py", line 497, in import_dbapi
2026-11-19T18:16:03.599762818Z     import psycopg
2026-11-19T18:16:03.599829048Z ModuleNotFoundError: No module named 'psycopg'
2026-11-19T18:16:20.501307109Z Traceback (most recent call last):
2026-11-19T18:16:20.502976914Z   File "/opt/render/project/src/.venv/bin/uvicorn", line 6, in <module>
2026-11-19T18:16:20.503027794Z     sys.exit(main())
2026-11-19T18:16:20.503033605Z              ~~~~^^
2026-11-19T18:16:20.503038865Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 1653, in __call__
2026-11-19T18:16:20.503048065Z     return self.main(*args, **kwargs)
2026-11-19T18:16:20.503052415Z            ~~~~~~~~~^^^^^^^^^^^^^^^^^
2026-11-19T18:16:20.503056735Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 1560, in main
2026-11-19T18:16:20.503061445Z     rv = self.invoke(ctx)
2026-11-19T18:16:20.503065215Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 1414, in invoke
2026-11-19T18:16:20.503069575Z     return ctx.invoke(self.callback, **ctx.params)
2026-11-19T18:16:20.503073585Z            ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:16:20.503077905Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/click/core.py", line 911, in invoke
2026-11-19T18:16:20.503082065Z     return callback(*args, **kwargs)
2026-11-19T18:16:20.503086346Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/main.py", line 448, in main
2026-11-19T18:16:20.503090246Z     run(
2026-11-19T18:16:20.503094655Z     ~~~^
2026-11-19T18:16:20.503098956Z         app,
2026-11-19T18:16:20.503102946Z         ^^^^
2026-11-19T18:16:20.503107066Z     ...<49 lines>...
2026-11-19T18:16:20.503111076Z         reset_contextvars=reset_contextvars,
2026-11-19T18:16:20.503115166Z         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:16:20.503119066Z     )
2026-11-19T18:16:20.503123196Z     ^
2026-11-19T18:16:20.503127276Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/main.py", line 620, in run
2026-11-19T18:16:20.503131276Z     config.load_app()
2026-11-19T18:16:20.503135156Z     ~~~~~~~~~~~~~~~^^
2026-11-19T18:16:20.503139096Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/config.py", line 434, in load_app
2026-11-19T18:16:20.503143276Z     return import_from_string(self.app)
2026-11-19T18:16:20.503147836Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/importer.py", line 22, in import_from_string
2026-11-19T18:16:20.503151787Z     raise exc from None
2026-11-19T18:16:20.503155747Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/uvicorn/importer.py", line 19, in import_from_string
2026-11-19T18:16:20.503159616Z     module = importlib.import_module(module_str)
2026-11-19T18:16:20.503163607Z   File "/opt/render/project/python/Python-3.14.10/lib/python3.14/importlib/__init__.py", line 88, in import_module
2026-11-19T18:16:20.503167957Z     return _bootstrap._gcd_import(name[level:], package, level)
2026-11-19T18:16:20.503172047Z            ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-11-19T18:16:20.503190917Z   File "<frozen importlib._bootstrap>", line 1406, in _gcd_import
2026-11-19T18:16:20.503195387Z   File "<frozen importlib._bootstrap>", line 1371, in _find_and_load
2026-11-19T18:16:20.503199677Z   File "<frozen importlib._bootstrap>", line 1342, in _find_and_load_unlocked
2026-11-19T18:16:20.503203567Z   File "<frozen importlib._bootstrap>", line 938, in _load_unlocked
2026-11-19T18:16:20.503207507Z   File "<frozen importlib._bootstrap_external>", line 763, in exec_module
2026-11-19T18:16:20.503211787Z   File "<frozen importlib._bootstrap>", line 491, in _call_with_frames_removed
2026-11-19T18:16:20.503230008Z   File "/opt/render/project/src/backend/app/main.py", line 4, in <module>
2026-11-19T18:16:20.503233018Z     from app.core.database import Base, engine
2026-11-19T18:16:20.503236318Z   File "/opt/render/project/src/backend/app/core/database.py", line 5, in <module>
2026-11-19T18:16:20.503238978Z     engine = create_engine(
2026-11-19T18:16:20.503241638Z         settings.DATABASE_URL,
2026-11-19T18:16:20.503244398Z         pool_pre_ping=True,
2026-11-19T18:16:20.503247008Z         echo=False
2026-11-19T18:16:20.503249628Z     )
2026-11-19T18:16:20.503252628Z   File "<sqlalchemy generated warned() wrapper for sqlalchemy.engine.create.create_engine>", line 2, in create_engine
2026-11-19T18:16:20.503255248Z     return target(fn, url, **kwargs)
2026-11-19T18:16:20.503257988Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/sqlalchemy/util/deprecations.py", line 281, in warned
2026-11-19T18:16:20.503260788Z     return fn(*args, **kwargs)  # type: ignore[no-any-return]
2026-11-19T18:16:20.503263578Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/sqlalchemy/engine/create.py", line 602, in create_engine
2026-11-19T18:16:20.503266278Z     dbapi = dbapi_meth(**dbapi_args)
2026-11-19T18:16:20.503278598Z   File "/opt/render/project/src/.venv/lib/python3.14/site-packages/sqlalchemy/dialects/postgresql/psycopg.py", line 497, in import_dbapi
2026-11-19T18:16:20.503281708Z     import psycopg
2026-11-19T18:16:20.503284428Z ModuleNotFoundError: No module named 'psycopg'