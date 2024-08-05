using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
namespace AxonApparel.Business
{
   public class ProductionOrderBusiness:IProductionOrderBusiness
    {
       IProductionOrderRepository repo = new ProductionOrderRepository();

       public Common.Response<IQueryable<Domain.ProcessOrderAddScreen>> Getrefno(int cmpid, int cmunitid)
       {
           try
           {
               var ProductWO = repo.Getrefno(cmpid,cmunitid);

               return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderAddScreen>> Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype, int buyerid, string refno, int styleid, string ordo)
       {
           try
           {
               var ProductWO = repo.Loadgrid(cmpid, closed, amend, cmpunitid, procid, ordertype, buyerid, refno, styleid, ordo);

               return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOutputitmsgrid(string closed, string jobordno, int procid)
       {
           try
           {
               var ProductWO = repo.LoadOutputitmsgrid(closed,jobordno,procid);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOutputjoborddetgrid(string closed, string jobordno, int procid)
       {
           try
           {
               var ProductWO = repo.LoadOutputJobdetgrid(closed, jobordno, procid);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputitmsgrid(string closed, string jobordno, int procid)
       {
           try
           {
               var ProductWO = repo.LoadInputitmsgrid(closed, jobordno, procid);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputjoborddetgrid(string closed, string jobordno, int procid)
       {
           try
           {
               var ProductWO = repo.LoadInputJobdetgrid(closed, jobordno, procid);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputStkWgrid(string itmcat, int itmid, int clrid, int sizeid, string jobordno, string transtype, int cmpid, int procid,int Storeid)
       {
           try
           {
               var ProductWO = repo.LoadInputStkWgrid(itmcat, itmid, clrid, sizeid, jobordno, transtype, cmpid, procid, Storeid);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> CreateUnitEntry(Domain.ProductionOrdMas MasEntry)
       {

           int? StoUnit = 0;
           string IRem = "";
           try
           {

               if (MasEntry.StoreUnitId == 0)
               {
                   StoUnit = null;
               }
               else
               {
                   StoUnit = MasEntry.StoreUnitId;
               }

               AxonApparel.Repository.Production_Ord_Mas ProdInsert = new AxonApparel.Repository.Production_Ord_Mas



               //var ID = repo.AddData(new AxonApparel.Repository.Production_Ord_Mas
               {
                  productionordid=MasEntry.productionordid,
                  productionorder=MasEntry.productionorder,
                  processordate=MasEntry.processordate,
                  processorid=MasEntry.processorid,
                  processid=MasEntry.processid,
                  remarks=MasEntry.remarks,
                  companyunitid=MasEntry.companyunitid,
                  companyid=MasEntry.companyid,
                  ProcessorType=MasEntry.ProcessorType,
                  OrderType=MasEntry.OrderType,
                  Closed=MasEntry.Closed,
                  OrderCumIssue=MasEntry.OrderCumIssue,
                  DelidateTime=MasEntry.DelidateTime,
                  ComboIds="",//MasEntry.ComboIds,
                  DispLocType=MasEntry.DispLocType,
                  DispLoc=MasEntry.DispLoc,
                  IssueLocType=MasEntry.IssueLocType,
                  IssueLoc=MasEntry.IssueLoc,
                  Teamid=MasEntry.Teamid,
                  StoreUnitId=StoUnit,//MasEntry.StoreUnitId,
                  CreatedBy=MasEntry.CreatedBy,
                  Phoneno=MasEntry.Phoneno,
                  contactperson=MasEntry.contactperson,
                  amount=MasEntry.amount,
                  taxamount=MasEntry.taxamount,
                  saccode=MasEntry.saccode,
                  IGST=MasEntry.IGST,
                  SGST=MasEntry.SGST,
                  TotCGST=MasEntry.TotCGST,
                  TotIGST=MasEntry.TotIGST,
                  TotSGST=MasEntry.TotSGST,
                  CGST=MasEntry.CGST,
                  ModuleType=MasEntry.moduletype

               };

               var ItmList = new List<Production_Ord_Det>();

               foreach (var PItem in MasEntry.ProdDet)
               {


                   if (PItem.ItemRemarks == "")
                   {
                       IRem = "";
                   }
                   else
                   {
                       IRem = PItem.ItemRemarks;
                   }

                   ItmList.Add(new Production_Ord_Det
                   {
                       productionordid = PItem.productionordid,
                       productionorddetid = PItem.productionorddetid,
                       itemid = PItem.itemid,
                       colorid = PItem.colorid,
                       sizeid = PItem.sizeid,
                       inp_op = PItem.inp_op,
                       order_output_qty = PItem.order_output_qty,
                       issued_qty = PItem.issued_qty,
                       rate = PItem.rate,
                       received_qty = PItem.received_qty,
                       Return_Qty = PItem.Return_Qty,
                       Returnable_Qty = PItem.Returnable_Qty,
                       Damage_qty = PItem.Damage_qty,
                       Cancel_Qty = PItem.Cancel_Qty,
                       Inp_CancelQty = PItem.Inp_CancelQty,
                       Markup_Rate = PItem.Markup_Rate,
                       Markup_Value = PItem.Markup_Value,
                       PlannedSizeID = PItem.PlannedSizeID,
                       OrdSecQty = PItem.OrdSecQty,
                       ItemRemarks = "",//PItem.ItemRemarks,
                       Loss_Qty = PItem.Loss_Qty,
                       IN_OUT_UOMID = PItem.IN_OUT_UOMID,
                       IssueSizeID = PItem.IssueSizeID,
                       ReqDate = PItem.ReqDate,
                       Loop_Len = PItem.Loop_Len,
                       Gauge = PItem.Gauge


                   });

               }

               var ItmstkList = new List<Production_Ord_JobDet>();

               foreach (var stk in MasEntry.ProdJobDet)
               {
                   ItmstkList.Add(new Production_Ord_JobDet
                   {
                       ProductionOrdid = stk.ProductionOrdid,
                       ProductionOrddetid = stk.ProductionOrddetid,
                       ProductionJobDetid = stk.ProductionJobDetid,
                       ProgQty = stk.ProgQty,
                       OrderQty = stk.OrderQty,
                       issued_qty = stk.issued_qty,
                       received_qty = stk.received_qty,
                       Return_Qty = stk.Return_Qty,
                       Damage_qty = stk.Damage_qty,
                       Cancel_Qty = stk.Cancel_Qty,
                       Job_ord_no = stk.Job_ord_no,
                       ProdPrgNo = stk.ProdPrgNo,
                       Returnable_Qty = stk.Returnable_Qty,
                       Closed = stk.Closed,
                       Inp_CancelQty = stk.Inp_CancelQty,
                       OrdSecQty = stk.OrdSecQty,
                       Loss_Qty = stk.Loss_Qty,
                       buy_ord_ship = stk.buy_ord_ship,
                       Itemid=stk.itemid,
                       Colorid=stk.colorid,
                       Sizeid=stk.sizeid,
                       ip_op=stk.ipop

                   });

               }

               var StkList = new List<Production_Ord_Stock>();

               if (MasEntry.ProdStkDet != null)
               {
                   foreach (var stkdet in MasEntry.ProdStkDet)
                   {

                       StkList.Add(new Production_Ord_Stock
                       {
                           ProductionOrdStockId = stkdet.ProductionOrdStockId,
                           ProductionOrdJobid = stkdet.ProductionOrdJobid,
                           Productionordid=stkdet.Productionordid,
                           IssueQty = stkdet.IssueQty,
                           LossQty = stkdet.LossQty,
                           LotNo = "",//stkdet.LotNo,
                           Returnable_Qty = stkdet.Returnable_Qty,
                           ReturnQty = stkdet.ReturnQty,
                           ItemStockId = stkdet.ItemStockId,
                           Itemid = stkdet.Itemid,
                           Colorid = stkdet.Colorid,
                           Sizeid = stkdet.Sizeid,
                           Markup_Rate = stkdet.Markup_Rate,
                           Job_ord_no=stkdet.jobordno,
                           Productionorder=stkdet.Productionorder

                       });

                   }
               }

               var AddlessList = new List<Production_Ord_AddLess>();

               if (MasEntry.ProdAddLess != null)
               {
                   foreach (var addless in MasEntry.ProdAddLess)
                   {

                       AddlessList.Add(new Production_Ord_AddLess
                       {
                           Production_Ord_id = addless.Production_Ord_id,
                           Production_Ord_Discountid = addless.Production_Ord_Discountid,
                           Addlessid = addless.Addlessid,
                           Amount = addless.Amount,
                           PlusOrMinus = addless.PlusOrMinus,
                           Percentage = addless.Percentage

                       });

                   }
               }

               var result = repo.AddDetData(ProdInsert,ItmList, ItmstkList, StkList, AddlessList, "Add");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
              // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<bool> UpdateData(Domain.ProductionOrdMas objupd)
       {


           string IRem = "";
           int? StoUnit = 0;          

                
           try
           {

               if (objupd.StoreUnitId == 0)
               {
                   StoUnit = null;
               }
               else
               {
                   StoUnit = objupd.StoreUnitId;
               }


              AxonApparel.Repository.Production_Ord_Mas ProdUpd = new AxonApparel.Repository.Production_Ord_Mas


               //var ID = repo.UpdateData(new AxonApparel.Repository.Production_Ord_Mas
               {
                   productionordid = objupd.productionordid,
                   productionorder = objupd.productionorder,
                   processordate = objupd.processordate,
                   processorid = objupd.processorid,
                   processid = objupd.processid,
                   remarks = objupd.remarks,
                   companyunitid = objupd.companyunitid,
                   companyid = objupd.companyid,
                   ProcessorType = objupd.ProcessorType,
                   OrderType = objupd.OrderType,
                   Closed = objupd.Closed,
                   OrderCumIssue = objupd.OrderCumIssue,
                   DelidateTime = objupd.DelidateTime,
                   ComboIds = "",//objupd.ComboIds,
                   DispLocType = objupd.DispLocType,
                   DispLoc = objupd.DispLoc,
                   IssueLocType = objupd.IssueLocType,
                   IssueLoc = objupd.IssueLoc,
                   Teamid = objupd.Teamid,
                   StoreUnitId = StoUnit,//objupd.StoreUnitId,
                   CreatedBy = objupd.CreatedBy,
                   Phoneno = objupd.Phoneno,
                   contactperson = objupd.contactperson,
                   amount = objupd.amount,
                   taxamount = objupd.taxamount,
                   saccode = objupd.saccode,
                   IGST = objupd.IGST,
                   SGST = objupd.SGST,
                   TotCGST = objupd.TotCGST,
                   TotIGST = objupd.TotIGST,
                   TotSGST = objupd.TotSGST,
                   CGST = objupd.CGST,
                   ModuleType = objupd.moduletype

               };

               var ItmList = new List<Production_Ord_Det>();

               foreach (var PItem in objupd.ProdDet)
               {
                   if (PItem.ItemRemarks == null)
                   {
                       IRem = "";
                   }
                   else
                   {
                       IRem = PItem.ItemRemarks;
                   }

                   ItmList.Add(new Production_Ord_Det
                   {
                       productionordid = PItem.productionordid,
                       productionorddetid = PItem.productionorddetid,
                       itemid = PItem.itemid,
                       colorid = PItem.colorid,
                       sizeid = PItem.sizeid,
                       inp_op = PItem.inp_op,
                       order_output_qty = PItem.order_output_qty,
                       issued_qty = PItem.issued_qty,
                       rate = PItem.rate,
                       received_qty = PItem.received_qty,
                       Return_Qty = PItem.Return_Qty,
                       Returnable_Qty = PItem.Returnable_Qty,
                       Damage_qty = PItem.Damage_qty,
                       Cancel_Qty = PItem.Cancel_Qty,
                       Inp_CancelQty = PItem.Inp_CancelQty,
                       Markup_Rate = PItem.Markup_Rate,
                       Markup_Value = PItem.Markup_Value,
                       PlannedSizeID = PItem.PlannedSizeID,
                       OrdSecQty = PItem.OrdSecQty,
                       ItemRemarks = IRem,//PItem.ItemRemarks,
                       Loss_Qty = PItem.Loss_Qty,
                       IN_OUT_UOMID = PItem.IN_OUT_UOMID,
                       IssueSizeID = PItem.IssueSizeID,
                       ReqDate = PItem.ReqDate,
                       Loop_Len = PItem.Loop_Len,
                       Gauge = PItem.Gauge


                   });

               }

               var ItmstkList = new List<Production_Ord_JobDet>();

               foreach (var stk in objupd.ProdJobDet)
               {
                   ItmstkList.Add(new Production_Ord_JobDet
                   {
                       ProductionOrdid = stk.ProductionOrdid,
                       ProductionOrddetid = stk.ProductionOrddetid,
                       ProductionJobDetid = stk.ProductionJobDetid,
                       ProgQty = stk.ProgQty,
                       OrderQty = stk.OrderQty,
                       issued_qty = stk.issued_qty,
                       received_qty = stk.received_qty,
                       Return_Qty = stk.Return_Qty,
                       Damage_qty = stk.Damage_qty,
                       Cancel_Qty = stk.Cancel_Qty,
                       Job_ord_no = stk.Job_ord_no,
                       ProdPrgNo = stk.ProdPrgNo,
                       Returnable_Qty = stk.Returnable_Qty,
                       Closed = stk.Closed,
                       Inp_CancelQty = stk.Inp_CancelQty,
                       OrdSecQty = stk.OrdSecQty,
                       Loss_Qty = stk.Loss_Qty,
                       buy_ord_ship = stk.buy_ord_ship,
                       Itemid=stk.itemid,
                       Colorid=stk.colorid,
                       Sizeid=stk.sizeid,
                       ip_op=stk.ipop


                   });

               }


               var StkList = new List<Production_Ord_Stock>();

               if (objupd.ProdStkDet != null)
               {
                   foreach (var stkdet in objupd.ProdStkDet)
                   {

                       StkList.Add(new Production_Ord_Stock
                       {
                           ProductionOrdStockId = stkdet.ProductionOrdStockId,
                           ProductionOrdJobid=stkdet.ProductionOrdJobid,
                           Productionordid=stkdet.Productionordid,
                           IssueQty=stkdet.IssueQty,
                           LossQty=stkdet.LossQty,
                           LotNo="",//stkdet.LotNo,
                           Returnable_Qty=stkdet.Returnable_Qty,
                           ReturnQty=stkdet.ReturnQty,
                           ItemStockId=stkdet.ItemStockId,
                           Itemid=stkdet.Itemid,
                           Colorid=stkdet.Colorid,
                           Sizeid=stkdet.Sizeid,
                           Markup_Rate=stkdet.Markup_Rate,
                           Job_ord_no = stkdet.jobordno,
                           Productionorder = stkdet.Productionorder

                       });

                   }
               }

               var AddlessList = new List<Production_Ord_AddLess>();

               if (objupd.ProdAddLess != null)
               {
                   foreach (var addless in objupd.ProdAddLess)
                   {

                       AddlessList.Add(new Production_Ord_AddLess
                       {
                           Production_Ord_id = addless.Production_Ord_id,
                           Production_Ord_Discountid = addless.Production_Ord_Discountid,
                           Addlessid = addless.Addlessid,
                           Amount = addless.Amount,
                           PlusOrMinus = addless.PlusOrMinus,
                           Percentage = addless.Percentage

                       });

                   }
               }

               var result = repo.UpdDetData(ProdUpd,ItmList, ItmstkList, StkList, AddlessList, "Update");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<bool> Delete(int id)
       {
           return new Response<bool>(repo.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
       }


       public Response<IQueryable<Domain.ProcessOrderAddScreen>> LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate,int? buyerid,string orderno)
       {
           try
           {
               var ProductWO = repo.LoadMaingrid(cmpid, closed, buyrsamp, processortype, prodordid,prodord, type, processorid, unitid, processid, fromdate, todate,buyerid,orderno);

               return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
              
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
       public Response<IQueryable<Domain.ProcessOrderAddScreen>> LoadMaingridord(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate)
       {
           try
           {
               var ProductWO = repo.LoadMaingridord(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate);

               return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditOutputitmsgrid(int prodid)
       {
           try
           {
               var ProductWO = repo.LoadEditOutputitmsgrid(prodid);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputitmsgrid(int prodid)
       {
           try
           {
               var ProductWO = repo.LoadEditInputitmsgrid(prodid);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditOutputJobDetgrid(int prodid)
       {
           try
           {
               var ProductWO = repo.LoadEditOutputJobdetgrid(prodid);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputJobDetgrid(int prodid)
       {
           try
           {
               var ProductWO = repo.LoadEditInputJobdetgrid(prodid);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputStkdet(int cmpid, int prodid, string prodordno)
       {

           try
           {
               var ProductWO = repo.LoadEditInputStkdet(cmpid,prodid,prodordno);

               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> DeleteDelEntry(Domain.ProductionOrdMas DelDEntry)
       {
           var ItmList = new List<Production_Ord_Det>();

           foreach (var PItem in DelDEntry.ProdDet)
           {
               ItmList.Add(new Production_Ord_Det
               {
                   productionordid = PItem.productionordid,
                   productionorddetid = PItem.productionorddetid,
                   itemid = PItem.itemid,
                   colorid = PItem.colorid,
                   sizeid = PItem.sizeid,
                   inp_op = PItem.inp_op,
                   order_output_qty = PItem.order_output_qty,
                   issued_qty = PItem.issued_qty,
                   rate = PItem.rate,
                   received_qty = PItem.received_qty,
                   Return_Qty = PItem.Return_Qty,
                   Returnable_Qty = PItem.Returnable_Qty,
                   Damage_qty = PItem.Damage_qty,
                   Cancel_Qty = PItem.Cancel_Qty,
                   Inp_CancelQty = PItem.Inp_CancelQty,
                   Markup_Rate = PItem.Markup_Rate,
                   Markup_Value = PItem.Markup_Value,
                   PlannedSizeID = PItem.PlannedSizeID,
                   OrdSecQty = PItem.OrdSecQty,
                   ItemRemarks = PItem.ItemRemarks,
                   Loss_Qty = PItem.Loss_Qty,
                   IN_OUT_UOMID = PItem.IN_OUT_UOMID,
                   IssueSizeID = PItem.IssueSizeID,
                   ReqDate = PItem.ReqDate,
                   Loop_Len = PItem.Loop_Len,
                   Gauge = PItem.Gauge


               });

           }

           var ItmstkList = new List<Production_Ord_JobDet>();

           foreach (var stk in DelDEntry.ProdJobDet)
           {
               ItmstkList.Add(new Production_Ord_JobDet
               {
                   ProductionOrdid = stk.ProductionOrdid,
                   ProductionOrddetid = stk.ProductionOrddetid,
                   ProductionJobDetid = stk.ProductionJobDetid,
                   ProgQty = stk.ProgQty,
                   OrderQty = stk.OrderQty,
                   issued_qty = stk.issued_qty,
                   received_qty = stk.received_qty,
                   Return_Qty = stk.Return_Qty,
                   Damage_qty = stk.Damage_qty,
                   Cancel_Qty = stk.Cancel_Qty,
                   Job_ord_no = stk.Job_ord_no,
                   ProdPrgNo = stk.ProdPrgNo,
                   Returnable_Qty = stk.Returnable_Qty,
                   Closed = stk.Closed,
                   Inp_CancelQty = stk.Inp_CancelQty,
                   OrdSecQty = stk.OrdSecQty,
                   Loss_Qty = stk.Loss_Qty,
                   buy_ord_ship = stk.buy_ord_ship,
                   Itemid = stk.itemid,
                   Colorid = stk.colorid,
                   Sizeid = stk.sizeid,
                   ip_op = stk.ipop


               });

           }


           var StkList = new List<Production_Ord_Stock>();

           if (DelDEntry.ProdStkDet != null)
           {
               foreach (var stkdet in DelDEntry.ProdStkDet)
               {

                   StkList.Add(new Production_Ord_Stock
                   {
                       ProductionOrdStockId = stkdet.ProductionOrdStockId,
                       ProductionOrdJobid = stkdet.ProductionOrdJobid,
                       Productionordid = stkdet.Productionordid,
                       IssueQty = stkdet.IssueQty,
                       LossQty = stkdet.LossQty,
                       LotNo = "",//stkdet.LotNo,
                       Returnable_Qty = stkdet.Returnable_Qty,
                       ReturnQty = stkdet.ReturnQty,
                       ItemStockId = stkdet.ItemStockId,
                       Itemid = stkdet.Itemid,
                       Colorid = stkdet.Colorid,
                       Sizeid = stkdet.Sizeid,
                       Markup_Rate = stkdet.Markup_Rate,
                       Job_ord_no = stkdet.jobordno,
                       Productionorder = stkdet.Productionorder

                   });

               }
           }

           var AddlessList = new List<Production_Ord_AddLess>();

           if (DelDEntry.ProdAddLess != null)
           {
               foreach (var addless in DelDEntry.ProdAddLess)
               {

                   AddlessList.Add(new Production_Ord_AddLess
                   {
                       Production_Ord_id = addless.Production_Ord_id,
                       Production_Ord_Discountid = addless.Production_Ord_Discountid,
                       Addlessid = addless.Addlessid,
                       Amount = addless.Amount,
                       PlusOrMinus = addless.PlusOrMinus,
                       Percentage = addless.Percentage

                   });

               }
           }

           var result = repo.DeleteDetData(ItmList, ItmstkList, StkList, AddlessList, "");

           return new Response<bool>(result, Status.SUCCESS, "Deleted Successfully");
       }




       public Response<IQueryable<Domain.ProductionOrdAddLess>> LoadEditAddlessgrid(int prodid)
       {
           try
           {
               var ProductWO = repo.LoadEditAddlessgrid(prodid);

               return new Response<IQueryable<Domain.ProductionOrdAddLess>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionOrdAddLess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
    }
}
