using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public class GeneralMemoBusiness:IGeneralMemoBusiness
    {
       IGeneralMemoRepository repo = new GeneralMemoRepository();

       public Common.Response<IList<Domain.GeneralMemoDet>> GetItemLoad(string Itmgrpid)
       {
           try
           {
               var ProductWO = repo.GetItemLoad(Itmgrpid);

               return new Response<IList<Domain.GeneralMemoDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IList<Domain.GeneralMemoDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> CreateUnitEntry(Domain.GeneralMemoMas Entry)
       {
           string vehno="";
           int? proid = 0;
           int? styid = 0;
           if (Entry.VehicleNo == null)
           {
               vehno = "";
           }
           else {
               vehno = Entry.VehicleNo;
           }

           if (Entry.ProcessId == 0)
           {
               proid = null;
           }
           else {
               proid = Entry.ProcessId;
           }
           if (Entry.styleid == 0)
           {
               styid = null;
           }
           else {
               styid = Entry.styleid;
           }
           try
           {

                 AxonApparel.Repository.General_Memo_mas Insert = new AxonApparel.Repository.General_Memo_mas

               //var ID = repo.AddData(new AxonApparel.Repository.General_Memo_mas
               {
                   Gen_memo_Masid=Entry.Gen_memo_Masid,
                   Gen_memo_No=Entry.Gen_memo_No,
                   Gen_memo_date=Entry.Gen_memo_date,
                   Gen_memo_RefNo=Entry.Gen_memo_RefNo,
                   Gen_memo_Refdate=Entry.Gen_memo_Refdate,
                   Companyid=Entry.Companyid,
                   UnitId=Entry.UnitId,
                   Unit_or_Other=Entry.Unit_or_Other,
                   Remarks=Entry.Remarks,
                   VehicleNo = vehno,//Entry.VehicleNo,
                   RequestnerId=Entry.RequestnerId,
                   CreatedBy=Entry.CreatedBy,
                   Order_no=Entry.Order_no,
                   ProcessId = proid,//Entry.ProcessId,
                   Company_unitID=Entry.Company_unitID,
                   styleid = styid,//Entry.styleid,
                   BuyerId=Entry.BuyerId,
                   ReturnDate=Entry.ReturnDate,
                   ReturnOrNo=Entry.ReturnOrNo,
                   validatebomqtyindelivery=Entry.validatebomqtyindelivery,
                  



               };

               var ItmList = new List<General_Memo_det>();

               foreach (var PItem in Entry.GenMemDet)
               {
                   ItmList.Add(new General_Memo_det
                   {
                    Gen_memo_Masid=PItem.Gen_memo_Masid,
                    Gen_memo_Detid=PItem.Gen_memo_Detid,
                    Itemid=PItem.Itemid,
                    Colorid=PItem.Colorid,
                    Sizeid=PItem.Sizeid,
                    Quantity=PItem.Quantity,
                    Uomid=PItem.Uomid,
                    ItemRemarks=PItem.ItemRemarks,
                    Rate=PItem.Rate,
                    Amount=PItem.Amount


                   });

               }



               var result = repo.AddDetData(Insert,ItmList, "Add");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

           }    
       }


       public Response<bool> Update(Domain.GeneralMemoMas obj)
       {
           try
           {

               string vehno = "";
               int? proid = 0;
               int? styid = 0;
               if (obj.VehicleNo == null)
               {
                   vehno = "";
               }
               else
               {
                   vehno = obj.VehicleNo;
               }

               if (obj.ProcessId == 0)
               {
                   proid = null;
               }
               else
               {
                   proid = obj.ProcessId;
               }
               if (obj.styleid == 0)
               {
                   styid = null;
               }
               else
               {
                   styid = obj.styleid;
               }
                                AxonApparel.Repository.General_Memo_mas Updobj = new AxonApparel.Repository.General_Memo_mas

               //var ID = repo.UpdateData(new AxonApparel.Repository.General_Memo_mas
               {
                   Gen_memo_Masid = obj.Gen_memo_Masid,
                   Gen_memo_No = obj.Gen_memo_No,
                   Gen_memo_date = obj.Gen_memo_date,
                   Gen_memo_RefNo = obj.Gen_memo_RefNo,
                   Gen_memo_Refdate = obj.Gen_memo_Refdate,
                   Companyid = obj.Companyid,
                   UnitId = obj.UnitId,
                   Unit_or_Other = obj.Unit_or_Other,
                   Remarks = obj.Remarks,
                   VehicleNo =vehno,// obj.VehicleNo,
                   RequestnerId = obj.RequestnerId,
                   CreatedBy = obj.CreatedBy,
                   Order_no = obj.Order_no,
                   ProcessId = proid,//obj.ProcessId,
                   Company_unitID = obj.Company_unitID,
                   styleid = styid,//obj.styleid,
                   BuyerId = obj.BuyerId,
                   ReturnDate = obj.ReturnDate,
                   ReturnOrNo = obj.ReturnOrNo,
                   validatebomqtyindelivery = obj.validatebomqtyindelivery



               };

               var ItmList = new List<General_Memo_det>();

               foreach (var PItem in obj.GenMemDet)
               {
                   ItmList.Add(new General_Memo_det
                   {
                       Gen_memo_Masid = PItem.Gen_memo_Masid,
                       Gen_memo_Detid = PItem.Gen_memo_Detid,
                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       Sizeid = PItem.Sizeid,
                       Quantity = PItem.Quantity,
                       Uomid = PItem.Uomid,
                       ItemRemarks = PItem.ItemRemarks,
                       Rate = PItem.Rate,
                       Amount = PItem.Amount


                   });

               }



               var result = repo.UpdDetData(Updobj,ItmList, "Update");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

           }
       }


       public Response<IQueryable<Domain.GeneralMemoMas>> GetDataMainList(int? cmpid, string entryno, int? unitid, int? masid, string refno, int? buyerid, string fromDate, string todate)
       {
           try
           {
               var ProductWO = repo.GetDataMainList(cmpid, entryno, unitid, masid, refno, buyerid, fromDate, todate);

               return new Response<IQueryable<Domain.GeneralMemoMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.GeneralMemoMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.GeneralMemoDet>> GeteditItemLoad(int masid)
       {
           try
           {
               var ProductWO = repo.GeteditItemLoad( masid);

               return new Response<IQueryable<Domain.GeneralMemoDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.GeneralMemoDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> Delete(int id)
       {
           return new Response<bool>(repo.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
       }
    }
}
