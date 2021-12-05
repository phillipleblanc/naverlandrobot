import sendgrid from "@sendgrid/mail"

const sendgridApiKey = process.env.SENDGRID_API_KEY

if (sendgridApiKey) {
  sendgrid.setApiKey(sendgridApiKey)
}

export async function sendMail(msg: sendgrid.MailDataRequired) {
  if (!sendgridApiKey) {
    console.warn("WARNING: Sendgrid API Key not set, not sending mail")
    return
  }

  await sendgrid.send(msg)
  console.log("Sent email to", msg.to)
}

/*

import sendgrid from "@sendgrid/mail"
import { sendMail } from "./sendgrid.js"

    const templateData = {
      buildings: [
        {
          name: building.name,
          link: building.naverLink,
          units: units,
        },
      ],
    }

    const msg: sendgrid.MailDataRequired = {
      to: [<email>],
      from: "robot@naverland.cardzlab.xyz",
      templateId: "d-ad19766d010e404bb09ced9703f850b8",
      dynamicTemplateData: templateData,
    }

    await sendMail(msg)

*/

/*
email payload
{
    "buildings": [
        {
            "name": "Hanwha Obelisk",
            "link": "https://new.land.naver.com/complexes/12240?ms=37.539953,126.945308,17&a=APT:ABYG:JGC&e=RETAIL&articleNo=2132027944",
            "units": [
                {
                    "contractType": "월세",
                    "price": "1,000/110",
                    "unitType": "아파트",
                    "unitSpec": "50A/38m², 11/37층, 서향"
                  }
            ]
        }
    ]
}

*/
