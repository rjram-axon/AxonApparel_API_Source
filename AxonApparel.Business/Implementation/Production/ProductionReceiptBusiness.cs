using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public class ProductionReceiptBusiness:IProductionReceiptBusiness
    {
       IProductionReceiptRepository repo = new ProductionReceiptRepository();

       public Common.Response<IQueryable<Domain.ProductionRecptMas>> Getprocess(int cmpid, int cmunitid, string ordtype)
       {
           try
           {
               var ProductWO = repo.Getprocess(cmpid, cmunitid,ordtype);

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionRecptMas>> Getprocessor()
       {
           try
           {
               var ProductWO = repo.Getprocessor();

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IQueryable<Domain.ProductionRecptMas>> Getwrkdiv()
       {
           try
           {
               var ProductWO = repo.Getwrkdiv();

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionRecptMas>> Getissueno(int cmpid, int cmunitid, int processid, int processorid)
       {
           try
           {
               var ProductWO = repo.Getissueno(cmpid, cmunitid, processid,processorid);

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionRecptMas>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed, int buyerid, string refno, string ordno, int clid, string procrtype)
       {
           try
           {
               var ProductWO = repo.Loadaddgrid(cmpid, cmunitid, processid, processorid, ordtype, closed, buyerid, refno, ordno, clid, procrtype);

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionRecptMas>> Loadorderno(int cmpid, int cmunitid, int processid, int processorid)
       {
           try
           {
               var ProductWO = repo.Loadorderno(cmpid, cmunitid, processid, processorid);

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IQueryable<Domain.ProductionRecptMas>> Loadcolor(int cmpid, int cmunitid, int processid, int processorid)
       {
           try
           {
               var ProductWO = repo.Loadcolor(cmpid, cmunitid, processid, processorid);

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionRecptDet>> LoadItmgrid(string pid)
       {
           try
           {
               var ProductWO = repo.LoadItmgrid(pid);

               return new Response<IQueryable<Domain.ProductionRecptDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IQueryable<Domain.ProductionRecptJobdet>> Loadjobdetgrid(string pid)
       {
           try
           {
               var ProductWO = repo.Loadjobdetgrid(pid);

               return new Response<IQueryable<Domain.ProductionRecptJobdet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptJobdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> CreateUnitEntry(Domain.ProductionRecptMas MasEntry)
       {
           try
           {
               AxonApparel.Repository.Production_Recpt_Mas ProdInsert = new AxonApparel.Repository.Production_Recpt_Mas

              
               //var ID = repo.AddData(new AxonApparel.Repository.Production_Recpt_Mas
               {
                  prod_recpt_masid=MasEntry.prod_recpt_masid,
                  prod_recpt_no=MasEntry.prod_recpt_no,
                  prod_recpt_date=MasEntry.prod_recpt_date,
                  Recpt_Ref_date=MasEntry.Recpt_Ref_date,
                  Recpt_Ref_no=MasEntry.Recpt_Ref_no,
                  remarks=MasEntry.remarks,
                  OrderType=MasEntry.OrderType,
                  StoreUnitID=MasEntry.StoreUnitID,
                  CreatedBy=MasEntry.CreatedBy,
                  InwardNo=MasEntry.InwardNo,
                  SupplierInvoiceNo=MasEntry.SupplierInvoiceNo,
                  ExcldetoInv=MasEntry.ExcldetoInv,
                  InspDate=MasEntry.InspDate,
                  InspNo=MasEntry.InspNo,
                  EWayDate=MasEntry.EWayDate,
                  EWayNo=MasEntry.EWayNo

               };

               var ItmList = new List<Production_Recpt_Det>();

               foreach (var PItem in MasEntry.ProdDet)
               {
                   ItmList.Add(new Production_Recpt_Det
                   {
                      
                       itemid = PItem.itemid,
                       colorid = PItem.colorid,
                       sizeid = PItem.sizeid,                      
                       rate = PItem.rate,
                      Prod_Recpt_Detid=PItem.Prod_Recpt_Detid,
                      Prod_Recpt_Masid=PItem.Prod_Recpt_Masid,
                      ProcessOrdId=PItem.ProcessOrdId,
                      Received_qty=PItem.Received_qty,
                      Sec_Qty=PItem.Sec_Qty,
                      Invoice_Qty=PItem.Invoice_Qty,
                      closed=PItem.closed,
                      IPMarkup_rate=PItem.IPMarkup_rate,
                      OPMarkup_Rate=PItem.OPMarkup_Rate,
                      IssuedSizeID=PItem.IssuedSizeID,
                      WasQty=PItem.WasQty



                   });

               }

               var ItmstkList = new List<Production_Recpt_JobDet>();

               foreach (var stk in MasEntry.ProdJobDet)
               {
                   ItmstkList.Add(new Production_Recpt_JobDet
                   {
                       Prod_Recpt_Masid=stk.Prod_Recpt_Masid,
                       Prod_Recpt_Detid=stk.Prod_Recpt_Detid,
                       Prod_Recpt_JobDetid=stk.Prod_Recpt_JobDetid,
                       ProdPrgNo=stk.ProdPrgNo,
                       Job_Ord_No=stk.Job_Ord_No,
                       LotNo="",//stk.LotNo,
                       IssLot="",//stk.IssLot,
                       Itemid=stk.Itemid,
                       Colorid=stk.Colorid,
                       Sizeid=stk.Sizeid,
                       ProcessOrdDetid=stk.ProcessOrdDetid,
                       ProcessOrdJobDetid=stk.ProcessOrdJobDetid,
                       Received_Qty=stk.Received_Qty,
                       Sec_Qty=stk.Sec_Qty,
                       DisRowId=stk.DisRowId,
                       LotRowid=stk.LotRowid,


                   });

               }


               var result = repo.AddDetData(ProdInsert,MasEntry.prod_recpt_no, ItmList, ItmstkList, "Add");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<bool> UpdateData(Domain.ProductionRecptMas objupd)
       {
           try
           {
               AxonApparel.Repository.Production_Recpt_Mas ProdUpd = new AxonApparel.Repository.Production_Recpt_Mas

               //var ID = repo.UpdateData(new AxonApparel.Repository.Production_Recpt_Mas
               {
                   prod_recpt_masid = objupd.prod_recpt_masid,
                   prod_recpt_no = objupd.prod_recpt_no,
                   prod_recpt_date = objupd.prod_recpt_date,
                   Recpt_Ref_date = objupd.Recpt_Ref_date,
                   Recpt_Ref_no = objupd.Recpt_Ref_no,
                   remarks = objupd.remarks,
                   OrderType = objupd.OrderType,
                   StoreUnitID = objupd.StoreUnitID,
                   CreatedBy = objupd.CreatedBy,
                   InwardNo = objupd.InwardNo,
                   SupplierInvoiceNo = objupd.SupplierInvoiceNo,
                   ExcldetoInv = objupd.ExcldetoInv,
                   InspDate = objupd.InspDate,
                   InspNo = objupd.InspNo,
                   EWayDate = objupd.EWayDate,
                   EWayNo = objupd.EWayNo

               };

               var ItmList = new List<Production_Recpt_Det>();

               foreach (var PItem in objupd.ProdDet)
               {
                   ItmList.Add(new Production_Recpt_Det
                   {

                       itemid = PItem.itemid,
                       colorid = PItem.colorid,
                       sizeid = PItem.sizeid,
                       rate = PItem.rate,
                       Prod_Recpt_Detid = PItem.Prod_Recpt_Detid,
                       Prod_Recpt_Masid = PItem.Prod_Recpt_Masid,
                       ProcessOrdId = PItem.ProcessOrdId,
                       Received_qty = PItem.Received_qty,
                       Sec_Qty = PItem.Sec_Qty,
                       Invoice_Qty = PItem.Invoice_Qty,
                       closed = PItem.closed,
                       IPMarkup_rate = PItem.IPMarkup_rate,
                       OPMarkup_Rate = PItem.OPMarkup_Rate,
                       IssuedSizeID = PItem.IssuedSizeID,
                       WasQty = PItem.WasQty



                   });

               }

               var ItmstkList = new List<Production_Recpt_JobDet>();

               foreach (var stk in objupd.ProdJobDet)
               {
                   ItmstkList.Add(new Production_Recpt_JobDet
                   {
                       Prod_Recpt_Masid = stk.Prod_Recpt_Masid,
                       Prod_Recpt_Detid = stk.Prod_Recpt_Detid,
                       Prod_Recpt_JobDetid = stk.Prod_Recpt_JobDetid,
                       ProdPrgNo = stk.ProdPrgNo,
                       Job_Ord_No = stk.Job_Ord_No,
                       LotNo = "",//stk.LotNo,
                       IssLot = "",//stk.IssLot,
                       Itemid = stk.Itemid,
                       Colorid = stk.Colorid,
                       Sizeid = stk.Sizeid,
                       ProcessOrdDetid = stk.ProcessOrdDetid,
                       ProcessOrdJobDetid = stk.ProcessOrdJobDetid,
                       Received_Qty = stk.Received_Qty,
                       Sec_Qty = stk.Sec_Qty,
                       DisRowId = stk.DisRowId,
                       LotRowid = stk.LotRowid,


                   });

               }


               var result = repo.UpdDetData(ProdUpd,objupd.prod_recpt_no, ItmList, ItmstkList, "Update");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<bool> DeleteDelEntry(Domain.ProductionRecptMas DelDEntry)
       {

           var List = new List<Production_Recpt_Mas>();

           //foreach (var PItem in DelDEntry.ProdDet)
           //{
           List.Add(new Production_Recpt_Mas
               {

                   prod_recpt_masid = DelDEntry.prod_recpt_masid,
                   prod_recpt_no = DelDEntry.prod_recpt_no,
                   prod_recpt_date = DelDEntry.prod_recpt_date,
                   Recpt_Ref_date = DelDEntry.Recpt_Ref_date,
                   Recpt_Ref_no = DelDEntry.Recpt_Ref_no,
                   remarks = DelDEntry.remarks,
                   OrderType = DelDEntry.OrderType,
                   StoreUnitID = DelDEntry.StoreUnitID,
                   CreatedBy = DelDEntry.CreatedBy,
                 


               });

           //}




           var ItmList = new List<Production_Recpt_Det>();

           foreach (var PItem in DelDEntry.ProdDet)
           {
               ItmList.Add(new Production_Recpt_Det
               {

                   itemid = PItem.itemid,
                   colorid = PItem.colorid,
                   sizeid = PItem.sizeid,
                   rate = PItem.rate,
                   Prod_Recpt_Detid = PItem.Prod_Recpt_Detid,
                   Prod_Recpt_Masid = PItem.Prod_Recpt_Masid,
                   ProcessOrdId = PItem.ProcessOrdId,
                   Received_qty = PItem.Received_qty,
                   Sec_Qty = PItem.Sec_Qty,
                   Invoice_Qty = PItem.Invoice_Qty,
                   closed = PItem.closed,
                   IPMarkup_rate = PItem.IPMarkup_rate,
                   OPMarkup_Rate = PItem.OPMarkup_Rate,
                   IssuedSizeID = PItem.IssuedSizeID,
                   WasQty = PItem.WasQty



               });

           }

           var ItmstkList = new List<Production_Recpt_JobDet>();

           foreach (var stk in DelDEntry.ProdJobDet)
           {
               ItmstkList.Add(new Production_Recpt_JobDet
               {
                   Prod_Recpt_Masid = stk.Prod_Recpt_Masid,
                   Prod_Recpt_Detid = stk.Prod_Recpt_Detid,
                   Prod_Recpt_JobDetid = stk.Prod_Recpt_JobDetid,
                   ProdPrgNo = stk.ProdPrgNo,
                   Job_Ord_No = stk.Job_Ord_No,
                   LotNo = "",//stk.LotNo,
                   IssLot = "",//stk.IssLot,
                   Itemid = stk.Itemid,
                   Colorid = stk.Colorid,
                   Sizeid = stk.Sizeid,
                   ProcessOrdDetid = stk.ProcessOrdDetid,
                   ProcessOrdJobDetid = stk.ProcessOrdJobDetid,
                   Received_Qty = stk.Received_Qty,
                   Sec_Qty = stk.Sec_Qty,
                   DisRowId = stk.DisRowId,
                   LotRowid = stk.LotRowid,


               });

           }

           var str="";
           var result = repo.DeleteDetData(DelDEntry.prod_recpt_no, ItmList, ItmstkList, "");

           return new Response<bool>(result, Status.SUCCESS, "Deleted Successfully");
       }


       public Response<IQueryable<Domain.ProductionRecptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? processorid)
       {
           try
           {
               var ProductWO = repo.LoadMaingrid(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate, processorid);

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
       public Response<IQueryable<Domain.ProductionRecptMas>> LoadMaingridord(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? processorid)
       {
           try
           {
               var ProductWO = repo.LoadMaingridord(cmpid, processid, unitid, buyerid, masid, prodordid, jobordno, processortype, type, dcno, recptno, fromdate, todate, processorid);

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

  
 

       public Response<IQueryable<Domain.ProductionRecptDet>> LoadEdititemgrid(int pid)
       {
           try
           {
               var ProductWO = repo.LoadEditItmgrid(pid);

               return new Response<IQueryable<Domain.ProductionRecptDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionRecptJobdet>> LoadEditjobdetgrid(int pid)
       {
           try
           {
               var ProductWO = repo.LoadEditjobdetgrid(pid);

               return new Response<IQueryable<Domain.ProductionRecptJobdet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptJobdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionRecptDet>> ChkDC(string recpt, int pid)
       {
           try
           {
               var ProductWO = repo.ChkDC(recpt,pid);

               return new Response<IQueryable<Domain.ProductionRecptDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
    }
}
