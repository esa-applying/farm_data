read -p "Do you wish to seed the database with the .csv stored in /config/seed_data [y/n]" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  node server.js
else
  node config/seed_database.js
  node server.js
fi
