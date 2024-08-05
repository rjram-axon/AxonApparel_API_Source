using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
namespace AxonApparel.Business
{
   public class GeneralReceiptBusiness:IGeneralReceiptBusiness
    {
       IGeneralReceiptRepository repo = new GeneralReceiptRepository();

       public Common.Response<bool> CreateUnitEntry(Domain.GeneralMemoRetMas Entry)
       {
           try
           {
                AxonApparel.Repository.Gen_MemoRet_mas Insert = new AxonApparel.Repository.Gen_MemoRet_mas


               //var ID = repo.AddData(new AxonApparel.Repository.Gen_MemoRet_mas
               {
                   Gen_MemoRet_MasId=Entry.Gen_MemoRet_MasId,
                   Gen_memo_Masid = Entry.Gen_memo_Masid,
                  GenMemo_RetNo=Entry.GenMemo_RetNo,
                  GenmemoRet_Refdate=Entry.GenmemoRet_Refdate,
                  GenMemoRet_RefNo=Entry.GenMemoRet_RefNo,
                  GenMemoRetDate=Entry.GenMemoRetDate,
                  CompanyId=Entry.CompanyId,
                  UnitId=Entry.UnitId,
                  Unit_or_Other=Entry.Unit_or_Other,
                  Company_unitID=Entry.Company_unitID,
                  Remarks=Entry.Remarks,
                  VehicleNo=Entry.VehicleNo,
                  CreatedBy=Entry.CreatedBy,
                  buyerid=Entry.buyerid,
                  MemoType=Entry.MemoType

               };

               var ItmList = new List<Gen_MemoRet_det>();

               foreach (var PItem in Entry.GenMemDet)
               {
                   ItmList.Add(new Gen_MemoRet_det
                   {

                       Gen_memo_Masid = PItem.Gen_memo_Masid,
                       Gen_memo_Detid = PItem.Gen_memo_Detid,
                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       Sizeid = PItem.Sizeid,
                       Quantity = PItem.Quantity,
                       Uomid = PItem.Uomid,
                     


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


       public Response<IQueryable<Domain.GeneralMemoRetDet>> GetIssueno()
       {
           try
           {
               var ProductWO = repo.GetIssueno();

               return new Response<IQueryable<Domain.GeneralMemoRetDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.GeneralMemoRetDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.GeneralMemoRetDet>> Loaditm(int masid)
       {
           try
           {
               var ProductWO = repo.LoadItem(masid);

               return new Response<IQueryable<Domain.GeneralMemoRetDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.GeneralMemoRetDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.GeneralMemoRetMas>> LoadMaingrid(string entryno, int? masid, int? cmpid, int? unitid, string fromdate, string todate)
       {
           try
           {
               var ProductWO = repo.LoadMaingrid(entryno, masid, cmpid, unitid, fromdate, todate);

               return new Response<IQueryable<Domain.GeneralMemoRetMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.GeneralMemoRetMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.GeneralMemoRetMas>> Loadheaderdet(int masid)
       {
           try
           {
               var ProductWO = repo.Loadheaderdet(masid);

               return new Response<IQueryable<Domain.GeneralMemoRetMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.GeneralMemoRetMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.GeneralMemoRetDet>> Loadedititmdet(int masid)
       {
           try
           {
               var ProductWO = repo.Loadedititmdet(masid);

               return new Response<IQueryable<Domain.GeneralMemoRetDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.GeneralMemoRetDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> Update(Domain.GeneralMemoRetMas obj)
       {
           try
           {

                AxonApparel.Repository.Gen_MemoRet_mas Update = new AxonApparel.Repository.Gen_MemoRet_mas

               //var ID = repo.UpdateData(new AxonApparel.Repository.Gen_MemoRet_mas
               {
                   Gen_MemoRet_MasId = obj.Gen_MemoRet_MasId,
                   Gen_memo_Masid = obj.Gen_memo_Masid,
                   GenMemo_RetNo = obj.GenMemo_RetNo,
                   GenmemoRet_Refdate = obj.GenmemoRet_Refdate,
                   GenMemoRet_RefNo = obj.GenMemoRet_RefNo,
                   GenMemoRetDate = obj.GenMemoRetDate,
                   CompanyId = obj.CompanyId,
                   UnitId = obj.UnitId,
                   Unit_or_Other = obj.Unit_or_Other,
                   Company_unitID = obj.Company_unitID,
                   Remarks = obj.Remarks,
                   VehicleNo = obj.VehicleNo,
                   CreatedBy = obj.CreatedBy,
                   buyerid = obj.buyerid,
                   MemoType = obj.MemoType

               };

               var ItmList = new List<Gen_MemoRet_det>();

               foreach (var PItem in obj.GenMemDet)
               {
                   ItmList.Add(new Gen_MemoRet_det
                   {

                       Gen_memo_Masid = PItem.Gen_memo_Masid,
                       Gen_memo_Detid = PItem.Gen_memo_Detid,
                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       Sizeid = PItem.Sizeid,
                       Quantity = PItem.Quantity,
                       Uomid = PItem.Uomid,
                      


                   });

               }



               var result = repo.UpdDetData(Update,ItmList, "Update");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

           }
       }


       public Response<bool> Delete(int id)
       {
           return new Response<bool>(repo.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
       }
    }
}
