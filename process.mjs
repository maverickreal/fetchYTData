import fs from 'fs';
import axios from 'axios';
import * as db from './db/db.mjs';
import queries from './db/queries.mjs';

export const startProcess = (search) => {
    axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=' +
        process.env.key + '&q=' + search).then(res => {

            const items = res.data.items;
            if (items.empty) {
                console.log('Empty!');
                return;
            }

            let q = queries.store;
            console.log('q: ' + q);

            for (let item of items) {
                let videoId = item.id.videoId,
                    title = item.snippet.title,
                    thumbnail = item.snippet.thumbnails.default.url,
                    publishedAt = item.snippet.publishedAt,
                    channelId = item.snippet.channelId;

                //console.log(videoId, title, thumbnail, publishedAt, channelId);

                q += `('${videoId}', '${channelId}', '${title}', '${thumbnail}'),`;

            }
            q = q.slice(0, -1);
            q += ';';
            db.run(q);

        }).catch(err => console.error(err));
};