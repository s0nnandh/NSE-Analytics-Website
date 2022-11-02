import csv
import datetime
import os
import wget
import sqlite3

# connect to sqlite database
conn = sqlite3.connect('NSE.db')
c = conn.cursor()

## drop all tables
c.execute("DROP TABLE IF EXISTS NSE")

# create table 
c.execute('''CREATE TABLE NSE (SYMBOL TEXT,SERIES TEXT,OPEN REAL,HIGH REAL,LOW REAL,CLOSE REAL,LAST REAL,PREVCLOSE REAL,TOTTRDQTY REAL,TOTTRDVAL REAL,TIMESTAMP TEXT,TOTALTRADES REAL,ISIN TEXT)''')

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

    
    # if file exists
    if os.path.exists(f"cm{full_date}bhav.csv"):
        # read csv file and create a list of tuples
        with open(f"cm{full_date}bhav.csv", 'r') as f:
            next(f)
            data = [list(line) for line in csv.reader(f)]
            # filter rows whose second index is EQ
            data = [row for row in data if row.pop(1) == 'EQ']
            print(data[0])
            # add data to database
            c.executemany("INSERT INTO NSE VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", data)
            # commit changes
            conn.commit()
    print(url)

# print total count of rows
print(c.execute("SELECT COUNT(*) FROM NSE").fetchall())

conn.commit()
conn.close()

