import {MessageEntity} from "./MessageEntity"
import Axios, { AxiosResponse } from "axios";

const serverURL = "http://localhost:8080";
const apiUrl = `${serverURL}/api/messages`;

export const getAllMessages = (): Promise<MessageEntity[]> => {
  const promise = new Promise<MessageEntity[]>((resolve, reject) => {
    Axios.get<MessageEntity[]>(apiUrl)
      .then(response => resolve(mapDataListApiToModel(response)))
      .catch(error => reject(error));
    });
    return promise;
};

const mapDataListApiToModel = ({data}: AxiosResponse<any>): MessageEntity[] => {
  console.log(data);
  const content = data.content;
  return content.map(message => ({
    id: message.id,
    message: message.message
  }))};
