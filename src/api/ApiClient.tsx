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

export const postMessages = (data:MessageEntity): Promise<MessageEntity> => {
  const promise = new Promise<MessageEntity>((resolve, reject) => {
    Axios.post<MessageEntity>(apiUrl,data)
      .then(response => resolve(mapSingleApiToModel(response)))
      .catch(error => reject(error));
    });
    return promise;
};

export const deleteMessages = (id:number): Promise<void> => {
    return Axios.delete(apiUrl+"/"+id);
};

const mapDataListApiToModel = ({data}: AxiosResponse<any>): MessageEntity[] => {
  const content = data.content;
  return content.map(message => ({
    id: message.id,
    message: message.message,
    link:message.links[0].href
    }))
  };

  const mapSingleApiToModel = ({data}: AxiosResponse<any>): MessageEntity => {
    const response:MessageEntity = {
      id: data.id,
      message: data.message,
      link:""
    };
    return response;
  };
