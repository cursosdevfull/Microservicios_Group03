const refMessage1 = document.querySelector(".message1");
const refMessage2 = document.querySelector(".message2");

const execute = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/config", true);
  xhr.responseType = "json";

  xhr.onload = () => {
    const status = xhr.status;

    if (status === 200) {
      const xhr2 = new XMLHttpRequest();
      xhr2.open("GET", xhr.response.backend1 + "/message", true);
      xhr2.responseType = "json";

      xhr2.onload = () => {
        const status = xhr2.status;
        if (status === 200) {
          const messageBackend1 = xhr2.response.backend1;
          const messageBackend2 = xhr2.response.backend2;

          refMessage1.innerHTML = messageBackend1;
          refMessage2.innerHTML = messageBackend2;
        }
      };

      xhr2.send();
    }
  };

  xhr.send();
};

execute();
