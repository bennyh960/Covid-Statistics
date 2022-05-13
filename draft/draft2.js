const time = Math.floor(Date.now() / 1000);

setTimeout(() => {
  const nowtime = Math.floor(Date.now() / 1000);
  console.log(nowtime - time);
}, 2000);
