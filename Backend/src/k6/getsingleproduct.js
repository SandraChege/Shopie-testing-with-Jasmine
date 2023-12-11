import http from "k6/http";
import { sleep } from 'k6';

export const options = {
  vus: 5000,
  duration: "10s",
};

export default function () { 
    http.get('http://localhost:4500/product/getoneproduct/bef79d52-c858-46e5-876a-18823254cd5a')
    sleep(1); //delay of one second
}