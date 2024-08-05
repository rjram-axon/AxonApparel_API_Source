using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public class CSPReceiptBusiness:ICSPReceiptBusiness
    {
       ICSPReceiptRepository repo = new CSPReceiptRepository();

       public Common.Response<IQueryable<Domain.CSPReceiptDet>> GetAddlist(string ordno, int styleid, int cmpid)
       {
           try
           {
               var ProductWO = repo.GetAddlist(ordno, styleid, cmpid);

               return new Response<IQueryable<Domain.CSPReceiptDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.CSPReceiptDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> CreateUnitEntry(Domain.CSPReceiptMas MasEntry)
       {
           try
           {
               int? strunt = 0;
               if (MasEntry.StoreUnitID == 0)
               {
                   strunt = null ;
               }
               else {
                   strunt = MasEntry.StoreUnitID;
               }

               AxonApparel.Repository.CSPReceiptMas ProcInsert = new AxonApparel.Repository.CSPReceiptMas

               {
                  ReceiptID=MasEntry.ReceiptID,
                  ReceiptDate=MasEntry.ReceiptDate,
                  ReceiptNo=MasEntry.ReceiptNo,
                  RefNo=MasEntry.RefNo,
                  Remarks=MasEntry.Remarks,
                  StoreUnitID = strunt,//MasEntry.StoreUnitID,
                  Styleid=MasEntry.Styleid,
                  OrderNo=MasEntry.OrderNo,
                  Automated=MasEntry.Automated,
                  Buyerid=MasEntry.Buyerid,
                  CompanyId=MasEntry.CompanyId
                   //Process_Recpt_Return = ItmList

               };

               var ItmList = new List<CSPReceiptDet>();

               foreach (var PItem in MasEntry.RecptDet)
               {
                   ItmList.Add(new CSPReceiptDet
                   {

                     Itemid=PItem.Itemid,
                     Colorid=PItem.Colorid,
                     Sizeid=PItem.Sizeid,
                     Quantity=PItem.RecvdQuantity,
                     ReceiptID=PItem.ReceiptID,
                     ReceiptDetId=PItem.ReceiptDetId,
                     UomId=PItem.UomId,
                     SecQty=PItem.SecQty,
                     SecUomID=PItem.SecUomID,
                     StockID=PItem.StockID,
                     AcceptQty=PItem.AcceptQty,
                     RejectedQty=PItem.RejectedQty
                   });
               }

               var Itm = new List<Domain.CSPReceiptDet>();
               foreach (var Item in MasEntry.RecptDet)
               {
                   Itm.Add(new Domain.CSPReceiptDet
                   {
                       buyordbomdetid = Item.buyordbomdetid,
                       RecvdQuantity=Item.RecvdQuantity
                      
                   });
               }


               var result = repo.AddDetData(ProcInsert, ItmList, Itm, "Add");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<IQueryable<Domain.CSPReceiptMas>> LoadMaingrid(int cmpid, int buyerid, int masid, string refno, string ordno, int styleid, string recptno, string fromdate, string todate)
       {
           try
           {
               var ProductWO = repo.LoadMaingrid(cmpid, buyerid, masid, refno, ordno, styleid, recptno, fromdate, todate);

               return new Response<IQueryable<Domain.CSPReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.CSPReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.CSPReceiptDet>> GetEditlist(int masid)
       {
           try
           {
               var ProductWO = repo.GetEditlist(masid);

               return new Response<IQueryable<Domain.CSPReceiptDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.CSPReceiptDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> UpdateData(Domain.CSPReceiptMas objupd)
       {
           try
           {
               int? strunt = 0;
               if (objupd.StoreUnitID == 0)
               {
                   strunt = null;
               }
               else
               {
                   strunt = objupd.StoreUnitID;
               }
               AxonApparel.Repository.CSPReceiptMas ProcInsert = new AxonApparel.Repository.CSPReceiptMas

               {
                   ReceiptID = objupd.ReceiptID,
                   ReceiptDate = objupd.ReceiptDate,
                   ReceiptNo = objupd.ReceiptNo,
                   RefNo = objupd.RefNo,
                   Remarks = objupd.Remarks,
                   StoreUnitID = strunt,//objupd.StoreUnitID,
                   Styleid = objupd.Styleid,
                   OrderNo = objupd.OrderNo,
                   Automated = objupd.Automated,
                   Buyerid = objupd.Buyerid,
                   CompanyId = objupd.CompanyId
                   //Process_Recpt_Return = ItmList

               };

               var ItmList = new List<CSPReceiptDet>();

               foreach (var PItem in objupd.RecptDet)
               {
                   ItmList.Add(new CSPReceiptDet
                   {

                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       Sizeid = PItem.Sizeid,
                       Quantity = PItem.RecvdQuantity,
                       ReceiptID = PItem.ReceiptID,
                       ReceiptDetId = PItem.ReceiptDetId,
                       UomId = PItem.UomId,
                       SecQty = PItem.SecQty,
                       SecUomID = PItem.SecUomID,
                       StockID = PItem.StockID,
                       AcceptQty = PItem.AcceptQty,
                       RejectedQty = PItem.RejectedQty
                   });
               }

               var Itm = new List<Domain.CSPReceiptDet>();
               foreach (var Item in objupd.RecptDet)
               {
                   Itm.Add(new Domain.CSPReceiptDet
                   {
                       buyordbomdetid = Item.buyordbomdetid,
                       RecvdQuantity = Item.RecvdQuantity

                   });
               }


               var result = repo.UpdDetData(ProcInsert, ItmList, Itm, "Upd");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<bool> DeleteDet(Domain.CSPReceiptMas Entry)
       {
           try
           {
               int? strunt = 0;
               if (Entry.StoreUnitID == 0)
               {
                   strunt = null;
               }
               else
               {
                   strunt = Entry.StoreUnitID;
               }
               AxonApparel.Repository.CSPReceiptMas ProcInsert = new AxonApparel.Repository.CSPReceiptMas

               {
                   ReceiptID = Entry.ReceiptID,
                   ReceiptDate = Entry.ReceiptDate,
                   ReceiptNo = Entry.ReceiptNo,
                   RefNo = Entry.RefNo,
                   Remarks = Entry.Remarks,
                   StoreUnitID = strunt,//Entry.StoreUnitID,
                   Styleid = Entry.Styleid,
                   OrderNo = Entry.OrderNo,
                   Automated = Entry.Automated,
                   Buyerid = Entry.Buyerid,
                   CompanyId = Entry.CompanyId
                   //Process_Recpt_Return = ItmList

               };

               var ItmList = new List<CSPReceiptDet>();

               foreach (var PItem in Entry.RecptDet)
               {
                   ItmList.Add(new CSPReceiptDet
                   {

                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       Sizeid = PItem.Sizeid,
                       Quantity = PItem.RecvdQuantity,
                       ReceiptID = PItem.ReceiptID,
                       ReceiptDetId = PItem.ReceiptDetId,
                       UomId = PItem.UomId,
                       SecQty = PItem.SecQty,
                       SecUomID = PItem.SecUomID,
                       StockID = PItem.StockID,
                       AcceptQty = PItem.AcceptQty,
                       RejectedQty = PItem.RejectedQty
                   });
               }

               var Itm = new List<Domain.CSPReceiptDet>();
               foreach (var Item in Entry.RecptDet)
               {
                   Itm.Add(new Domain.CSPReceiptDet
                   {
                       buyordbomdetid = Item.buyordbomdetid,
                       RecvdQuantity = Item.RecvdQuantity

                   });
               }


               var result = repo.DelDetData(ProcInsert, ItmList, Itm, "Delete");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<IQueryable<Domain.CSPReceiptMas>> GetQltyAddlist(int masid)
       {
           try
           {
               var ProductWO = repo.GetQltyAddlist(masid);

               return new Response<IQueryable<Domain.CSPReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.CSPReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IQueryable<Domain.CSPReceiptDet>> GetQltyAdddetlist(int masid)
       {
           try
           {
               var ProductWO = repo.GetQltyAdddetlist(masid);

               return new Response<IQueryable<Domain.CSPReceiptDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.CSPReceiptDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> CreateUnitQlty(Domain.CSPReceiptMas MasEntry)
       {
           try
           {
               int? strunt = 0;
               if (MasEntry.StoreUnitID == 0)
               {
                   strunt = null;
               }
               else
               {
                   strunt = MasEntry.StoreUnitID;
               }

               AxonApparel.Repository.CSPReceiptMas ProcInsert = new AxonApparel.Repository.CSPReceiptMas

               {
                   ReceiptID = MasEntry.ReceiptID,
                   ReceiptDate = MasEntry.ReceiptDate,
                   ReceiptNo = MasEntry.ReceiptNo,
                   RefNo = MasEntry.RefNo,
                   Remarks = MasEntry.Remarks,
                   StoreUnitID = strunt,//MasEntry.StoreUnitID,
                   Styleid = MasEntry.Styleid,
                   OrderNo = MasEntry.OrderNo,
                   Automated = MasEntry.Automated,
                   Buyerid = MasEntry.Buyerid,
                   CompanyId = MasEntry.CompanyId
                   //Process_Recpt_Return = ItmList

               };

               var ItmList = new List<CSPReceiptDet>();

               foreach (var PItem in MasEntry.RecptDet)
               {
                   ItmList.Add(new CSPReceiptDet
                   {

                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       Sizeid = PItem.Sizeid,
                       Quantity = PItem.RecvdQuantity,
                       ReceiptID = PItem.ReceiptID,
                       ReceiptDetId = PItem.ReceiptDetId,
                       UomId = PItem.UomId,
                       SecQty = PItem.SecQty,
                       SecUomID = PItem.SecUomID,
                       StockID = PItem.StockID,
                       AcceptQty = PItem.AcceptQty,
                       RejectedQty = PItem.RejectedQty
                   });
               }

               var Itm = new List<Domain.CSPReceiptDet>();
               foreach (var Item in MasEntry.RecptDet)
               {
                   Itm.Add(new Domain.CSPReceiptDet
                   {
                       buyordbomdetid = Item.buyordbomdetid,
                       RecvdQuantity = Item.RecvdQuantity,
                       jobordno = MasEntry.OrderNo,
                       Itemid=Item.Itemid,
                       Colorid=Item.Colorid,
                       Sizeid=Item.Sizeid,
                       AcceptQty=Item.AcceptQty,
                       RejectedQty=Item.RejectedQty,
                       recptno=MasEntry.ReceiptNo,
                       recptdate=MasEntry.ReceiptDate,
                       styleid=MasEntry.Styleid,
                       UomId=Item.UomId,
                       struntid = MasEntry.StoreUnitID,
                       SecQty=Item.SecQty,
                       suppid=Item.suppid,
                       unitid=Item.unitid,
                       cmpid=MasEntry.CompanyId
                   });
               }


               var result = repo.AddQltyDetData(ProcInsert, ItmList, Itm, "Add");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<bool> UpdateQlty(Domain.CSPReceiptMas MasEntry)
       {
           try
           {
               int? strunt = 0;
               if (MasEntry.StoreUnitID == 0)
               {
                   strunt = null;
               }
               else
               {
                   strunt = MasEntry.StoreUnitID;
               }

               AxonApparel.Repository.CSPReceiptMas ProcInsert = new AxonApparel.Repository.CSPReceiptMas

               {
                   ReceiptID = MasEntry.ReceiptID,
                   ReceiptDate = MasEntry.ReceiptDate,
                   ReceiptNo = MasEntry.ReceiptNo,
                   RefNo = MasEntry.RefNo,
                   Remarks = MasEntry.Remarks,
                   StoreUnitID = strunt,//MasEntry.StoreUnitID,
                   Styleid = MasEntry.Styleid,
                   OrderNo = MasEntry.OrderNo,
                   Automated = MasEntry.Automated,
                   Buyerid = MasEntry.Buyerid,
                   CompanyId = MasEntry.CompanyId
                   //Process_Recpt_Return = ItmList

               };

               var ItmList = new List<CSPReceiptDet>();

               foreach (var PItem in MasEntry.RecptDet)
               {
                   ItmList.Add(new CSPReceiptDet
                   {

                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       Sizeid = PItem.Sizeid,
                       Quantity = PItem.RecvdQuantity,
                       ReceiptID = PItem.ReceiptID,
                       ReceiptDetId = PItem.ReceiptDetId,
                       UomId = PItem.UomId,
                       SecQty = PItem.SecQty,
                       SecUomID = PItem.SecUomID,
                       StockID = PItem.StockID,
                       AcceptQty = PItem.AcceptQty,
                       RejectedQty = PItem.RejectedQty
                   });
               }

               var Itm = new List<Domain.CSPReceiptDet>();
               foreach (var Item in MasEntry.RecptDet)
               {
                   Itm.Add(new Domain.CSPReceiptDet
                   {
                       buyordbomdetid = Item.buyordbomdetid,
                       RecvdQuantity = Item.RecvdQuantity,
                       jobordno = MasEntry.OrderNo,
                       Itemid = Item.Itemid,
                       Colorid = Item.Colorid,
                       Sizeid = Item.Sizeid,
                       AcceptQty = Item.AcceptQty,
                       RejectedQty = Item.RejectedQty,
                       recptno = MasEntry.ReceiptNo,
                       recptdate = MasEntry.ReceiptDate,
                       styleid = MasEntry.Styleid,
                       UomId = Item.UomId,
                       struntid = MasEntry.StoreUnitID,
                       SecQty = Item.SecQty,
                       suppid = Item.suppid,
                       unitid = Item.unitid,
                       cmpid = MasEntry.CompanyId,
                       Oldrejqty=Item.Oldrejqty,
                       Oldaccpqty=Item.Oldaccpqty
                   });
               }


               var result = repo.UpdQltyDetData(ProcInsert, ItmList, Itm, "Upd");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<bool> DeleteQlty(Domain.CSPReceiptMas MasEntry)
       {
           try
           {
               int? strunt = 0;
               if (MasEntry.StoreUnitID == 0)
               {
                   strunt = null;
               }
               else
               {
                   strunt = MasEntry.StoreUnitID;
               }

               AxonApparel.Repository.CSPReceiptMas ProcInsert = new AxonApparel.Repository.CSPReceiptMas

               {
                   ReceiptID = MasEntry.ReceiptID,
                   ReceiptDate = MasEntry.ReceiptDate,
                   ReceiptNo = MasEntry.ReceiptNo,
                   RefNo = MasEntry.RefNo,
                   Remarks = MasEntry.Remarks,
                   StoreUnitID = strunt,//MasEntry.StoreUnitID,
                   Styleid = MasEntry.Styleid,
                   OrderNo = MasEntry.OrderNo,
                   Automated = MasEntry.Automated,
                   Buyerid = MasEntry.Buyerid,
                   CompanyId = MasEntry.CompanyId
                   //Process_Recpt_Return = ItmList

               };

               var ItmList = new List<CSPReceiptDet>();

               foreach (var PItem in MasEntry.RecptDet)
               {
                   ItmList.Add(new CSPReceiptDet
                   {

                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       Sizeid = PItem.Sizeid,
                       Quantity = PItem.RecvdQuantity,
                       ReceiptID = PItem.ReceiptID,
                       ReceiptDetId = PItem.ReceiptDetId,
                       UomId = PItem.UomId,
                       SecQty = PItem.SecQty,
                       SecUomID = PItem.SecUomID,
                       StockID = PItem.StockID,
                       AcceptQty = PItem.AcceptQty,
                       RejectedQty = PItem.RejectedQty
                   });
               }

               var Itm = new List<Domain.CSPReceiptDet>();
               foreach (var Item in MasEntry.RecptDet)
               {
                   Itm.Add(new Domain.CSPReceiptDet
                   {
                       buyordbomdetid = Item.buyordbomdetid,
                       RecvdQuantity = Item.RecvdQuantity,
                       jobordno = MasEntry.OrderNo,
                       Itemid = Item.Itemid,
                       Colorid = Item.Colorid,
                       Sizeid = Item.Sizeid,
                       AcceptQty = Item.AcceptQty,
                       RejectedQty = Item.RejectedQty,
                       recptno = MasEntry.ReceiptNo,
                       recptdate = MasEntry.ReceiptDate,
                       styleid = MasEntry.Styleid,
                       UomId = Item.UomId,
                       struntid = MasEntry.StoreUnitID,
                       SecQty = Item.SecQty,
                       suppid = Item.suppid,
                       unitid = Item.unitid,
                       cmpid = MasEntry.CompanyId,
                       Oldrejqty = Item.Oldrejqty,
                       Oldaccpqty = Item.Oldaccpqty
                   });
               }


               var result = repo.DeleteQltyDetData(ProcInsert, ItmList, Itm, "Del");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }
    }
}
