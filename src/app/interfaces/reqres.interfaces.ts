
export interface responseData {

    page:number,
    per_page:number,
    total:number,
    total_pages:number,
    data: Array<dataUsers>

}




export interface dataUsers{
    id:number,
    email:string,
    first_name:string,
    last_name:string,
    avatar:string
}