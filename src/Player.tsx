import './App.css';
import { useParams } from 'react-router-dom';
import { useServiceRecord } from './useServiceRecord';
import { useFileShare } from './useFileShare';
import { useScreenshots } from './useScreenshots';

function getRankImage(rank: number, grade: number) {
  return <img src={`/ranks/${rank}/${grade}.svg`} height='50'/>
}

function getFiletypeName(filetype: number) {
  switch(filetype) {
    case 10:
      return 'Map Variant'
    case 11:
      return 'Film'
    case 13:
      return 'Screenshot'
    default:
      return filetype;
  }
}

function Player() {
  const gamertag = useParams().gamertag;
  const serviceRecord = useServiceRecord(gamertag!);
  const fileShare = useFileShare(gamertag!);
  const screenshots = useScreenshots(gamertag!);
  console.log(serviceRecord);

  if (serviceRecord.isLoading || fileShare.isLoading || screenshots.isLoading)
    return <h1>Loading...</h1>;

  return (
    <>
      <h1>{serviceRecord.data.playerName}</h1>
      {getRankImage(serviceRecord.data.rank, serviceRecord.data.grade)}
      <h2>File Share</h2>
      {fileShare.data.slots ? (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          {fileShare.data.slots.map((slot: any) => (
            <div>
              <h3>{slot.header.filename}</h3>
              {slot.header.filetype == 13 
                ? (
                  <img src={`http://localhost:8000/sunrise/player/${gamertag}/fileshare/${slot.slotNumber}.jpg`}  height='250' />
                )
                : (
                  <div style={{height: 250, width: 444, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:128, backgroundColor: '#aad'}}>
                    <span>{slot.slotNumber + 1}</span>
                  </div>
                )
              }
              <p>{getFiletypeName(slot.header.filetype)} by {slot.header.author}</p>
              <pre>{slot.header.description}</pre>
            </div>
          ))}
        </div>
      )
      : (
        <p>No files uploaded.</p>
      )}
      <h2>Screenshots</h2>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        {screenshots.data.map((screenshot: any) => (
          <img src={`http://localhost:8000/sunrise/screenshot/${screenshot.id}`} height='250'/>
        ))}
      </div>
      {/* {screenshots.data.map((screenshot: any) => (
        <img src={`/sunrise/screenshot/${screenshot.id}`}>
      ))} */}
    </>
  );
}

export default Player;
