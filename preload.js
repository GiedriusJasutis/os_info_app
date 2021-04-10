const os = require('os');
const Chart = require('chart.js');

window.addEventListener('DOMContentLoaded', () => {
  const osHostname = document.getElementById('os-hostname');
  const osPlatform = document.getElementById('os-platfom');
  const osArch = document.getElementById('os-arch');
  const osUserName = document.getElementById('os-username');
  const osTotalmem = document.getElementById('os-totalmem');
  const osHomedir = document.getElementById('os-homedir');
  const osUptime = document.getElementById('os-uptime');
  const osTmp = document.getElementById('os-tmp');

  osPlatform.textContent = os.platform();
  osArch.textContent = os.arch();
  osHostname.textContent = os.hostname();
  osUserName.textContent = os.userInfo([]).username;
  osTotalmem.textContent =
    (os.totalmem() * 9.31 * 0.0000000001).toFixed(4) + 'Gb';
  osHomedir.textContent = os.homedir();
  osUptime.textContent = (os.uptime() / 60).toFixed(2) + 'min';
  osTmp.textContent = os.tmpdir();

  const cpusArr = os.cpus().map((cpu) => {
    return cpu.speed;
  });

  const cpuLabels = os.cpus().map((cpu, index) => {
    index += 1;
    return 'CPU ' + index;
  });

  const baseStyle = 'rgba(255, 159, 64, 0.2)';
  const baseStylesBg = os.cpus().map((cpu) => {
    return baseStyle;
  });

  const baseStylesBorder = os.cpus().map((cpu) => {
    return '#808080';
  });

  // Charts
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cpuLabels,
      datasets: [
        {
          label: os.cpus()[0].model,
          data: cpusArr,
          backgroundColor: baseStylesBg,
          borderColor: baseStylesBorder,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

// {
//   "name": "os_info",
//   "version": "1.0.0",
//   "description": "os check",
//   "main": "main.js",
//   "scripts": {
//     "start": "electron ."
//   },
//   "author": "",
//   "license": "ISC",
//   "dependencies": {
//     "chart.js": "^3.0.2",
//     "electron": "^12.0.2"
//   }
// }
