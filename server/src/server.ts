import express from "express";
import cors from 'cors'
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinuteStringToHours } from "./utils/convert-minutes-string-to-hours";

const app = express()

app.use(express.json())
app.use(cors({}))

const prisma = new PrismaClient({
    log: ['query']
})

app.get('/idols', async (request, response) => {
    const idols = await prisma.idol.findMany({
        include:{
            _count: {
              select:{
                ads: true
              }
            }
        }
    })
    return response.json(idols);
});


app.post('/idols/:id/ads', async (request, response) => {
    const idolId = request.params.id;
    const id = request.params.id

    const body: any = request.body;

  
    const ad = await prisma.ad.create({
      data: {
        id,
        idolId,
        name: body.name,
        stanTime: body.stanTime,
        discord: body.discord,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart) ,
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel
      }
    })
  
    return response.status(201).json(ad);
  })


app.get('/idols/:id/ads', async(request, response) => {

    const idolId = request.params.id;

    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            stanTime: true,
            hourStart: true,
            hourEnd: true,
        },

        where:{
            idolId,
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    return response.json(ads.map(ad => {
        return{
         ...ad,
         weekDays: ad.weekDays.split(','),
         hourStart: convertMinuteStringToHours(ad.hourStart),
         hourEnd: convertMinuteStringToHours(ad.hourEnd),
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {

    const adId = request.params.id;
    
    const ad = await prisma.ad.findUniqueOrThrow({
       select:{
        discord:true,
       },
        where:{
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord,
    })
})

app.listen(3333)