### Housing Register Data Collection > Create Box Folder

1. Connect to Housing Register Database - COMPLETE
2. Retrieve last 5 case numbers - COMPLETE
3. Compare those numbers with previoulys obtained numbers - COMPLETE
4. Identify new case numbers - COMPLETE
5. Connect to Box API - COMPLETE
6. Create new case folders with sub folders - COMPLETE
7. Cleanup case number list - COMPLETE

- Nodejs Application hosted on PI. External script runs this API on a scheduled basis.
- Housing Register database is stored on an SQL Server instance.
- File for comparing case numbers stored as a JSON array.

### Housing Task Data Receiver > Create Box Folder

1. Create endpoint to receive JSON data transmitted by Task system
2. Connect to Box API
3. Create new case folder with sub folders