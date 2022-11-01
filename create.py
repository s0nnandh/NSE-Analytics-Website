import datetime
import os
import wget
import sqlite3

# connect to sqlite database
conn = sqlite3.connect('NSE.db')
c = conn.cursor()

# create table 
c.execute('''CREATE TABLE IF NOT EXISTS NSE (SYMBOL TEXT,SERIES TEXT,OPEN REAL,HIGH REAL,LOW REAL,CLOSE REAL,LAST REAL,PREVCLOSE REAL,TOTTRDQTY REAL,TOTTRDVAL REAL,TIMESTAMP TEXT,TOTALTRADES REAL,ISIN TEXT)''')

Max_Dates = 20

# changing directory for downloads

cwd = os.getcwd()

if not os.path.exists(cwd + '/NSE-Data'):
    os.makedirs(cwd + '/NSE-Data')

os.chdir(cwd + '/NSE-Data')

for days in range(Max_Dates):
    date = datetime.date.today() - datetime.timedelta(days=days)
    
    month = date.strftime("%B")[:3].upper()

    year = date.strftime("%Y")

    day = date.strftime("%d")

    full_date = day + month + year

    url = f"https://www1.nseindia.com/content/historical/EQUITIES/{year}/{month}/cm{full_date}bhav.csv.zip"

    # download file using wget if file does not exists
    if not (os.path.exists(f"cm{full_date}bhav.csv.zip") or os.path.exists(f"cm{full_date}bhav.csv")):
        try:
            wget.download(url)
        except:
            print("File does not exist")
    
    # unzip
    if os.path.exists(f"cm{full_date}bhav.csv.zip"):
        os.system(f"unzip cm{full_date}bhav.csv.zip")
        os.system(f"rm cm{full_date}bhav.csv.zip")

    
    # insert data
    if os.path.exists(f"cm{full_date}bhav.csv"):
        with open(f"cm{full_date}bhav.csv", 'r') as f:
            next(f)
            # print([tuple(line) for line in (l.strip().split(",") for l in f)])
            c.executemany("INSERT INTO NSE VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [tuple(line) for line in (l.strip().split(",")[:-1] for l in f)])
            conn.commit()

    print(url)

conn.commit()

