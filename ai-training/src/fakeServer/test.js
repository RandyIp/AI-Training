const spawner = require('child_process').spawn;
const data_to_pass_in = 'This data to Python'
console.log('Data sent to python script', data_to_pass_in);
const python_process = spawner('python', ['./python.py', data_to_pass_in]);
python_process.stdout.on('data', (data) => {
  console.log('Data recieved from python script:', data.toString())
})