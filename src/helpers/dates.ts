export const convertTimestampToDate = (unixTimestamp: number) => {

    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime = `${hours}:${minutes.substring(-2)}:${seconds.substring(-2)}`;
    console.warn(formattedTime);
    return date;
}


export const getShortDate = (withTime: boolean = false, character= "/") => {
    let today = new Date();

    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0'); 
    let day = String(today.getDate()).padStart(2, '0');
    let hours = today.getHours().toString();
    let minutes = today.getMinutes().toString();
    
  
    hours = Number(hours) < 10 ? '0' + hours : hours;
    minutes = Number(minutes) < 10 ? '0' + minutes : minutes;

    let time = `${hours}:${minutes}`
    // Crear la cadena en el formato "yyyy-MM-dd"
    let formattedDate = `${year}${character}${month}${character}${day}`;

    return withTime ? formattedDate.concat(" " + time) : formattedDate;
}