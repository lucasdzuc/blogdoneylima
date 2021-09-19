import { format, parseISO } from 'date-fns'

export default function formatDate(date: string){

  const firstDate = parseISO(date);

  const formattedDate = format(firstDate, "dd/MM/yyyy' às 'HH:mm'");
  
  // const formattedDate = format(firstDate, "dd 'de' MMMM',  às 'HH:mm'h'");
  // const znDate = zonedTimeToUtc(formattedDate, 'America/Sao_Paulo');
  //' dd/MM/yyyy' + ' HH:mm:ss'

  return formattedDate;
}
