import { useState } from "react"
import {Authorization} from "./Authorization"
import { Registration } from "./Registration"
import { FilesWelcome } from "../files/FilesWelcome"


export const StartPage = () => {

  const [viewPage, SetViewPage] = useState('Authorization')
  let content

  if (viewPage === "Authorization") {
    content = <Authorization SetViewPage={SetViewPage}/>
  } else if (viewPage === "Registration") {
    content = <Registration SetViewPage={SetViewPage}/>
  } else {
    content = <>
    <Navigate to="/files" />
    </>
  }

  return (
    <>{content}</>
  )
}
