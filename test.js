var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
  data = null,
  xhr = null;

for (let index = 0; index < 3; index++) {
  xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "http://192.168.50.13:50000/api/Account/GetListPermission");
  xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
  xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36");
  xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6IjEiLCJvcmdDb2RlIjoiRlNPRlQiLCJFeHBMb2dpbiI6IjUvMTUvMjAxOSA1OjAyOjE3IFBNIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiYWRtaW4iLCJuYmYiOjE1NTc5MDczMzcsImV4cCI6MTU1NzkxNDUzNywiaXNzIjoibXAtY3JtLmNvbS52biIsImF1ZCI6Im1wLWNybS5jb20udm4ifQ.V0B8AF4kPzzUJIhWYEPNUvjWpMEL-8PSoCZTc2fY2H0");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("Postman-Token", "3bc85516-2b4f-4231-a261-438b39396506");
  xhr.send(data);
}