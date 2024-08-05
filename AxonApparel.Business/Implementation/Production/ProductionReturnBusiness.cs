using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public class ProductionReturnBusiness:IProductionReturnBusiness
    {
       IProductionReturnRepository repo = new ProductionReturnRepository();


       public Common.Response<IQueryable<Domain.ProductionReturn>> Getprocess(int cmpid, int cmunitid)
       {
           try
           {
               var ProductWO = repo.Getprocess(cmpid, cmunitid);

               return new Response<IQueryable<Domain.ProductionReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Common.Response<IQueryable<Domain.ProductionReturn>> Getsupp()
       {
           try
           {
               var ProductWO = repo.Getsupp();

               return new Response<IQueryable<Domain.ProductionReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Common.Response<IQueryable<Domain.ProductionReturn>> Getbuyer(int cmpid, int cmunitid, int processid, int processorid)
       {
           try
           {
               var ProductWO = repo.Getbuyer(cmpid, cmunitid, processid, processorid);

               return new Response<IQueryable<Domain.ProductionReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Common.Response<IQueryable<Domain.ProductionReturn>> Getorder(int cmpid, int cmunitid, int processid, int processorid)
       {
           try
           {
               var ProductWO = repo.Getorder(cmpid, cmunitid, processid, processorid);

               return new Response<IQueryable<Domain.ProductionReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionReturn>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, int buyerid, string refno, string ordno, string ordtype, string procordtype)
       {
           try
           {
               var ProductWO = repo.Loadaddgrid(cmpid, cmunitid, processid, processorid, buyerid, refno, ordno, ordtype, procordtype);

               return new Response<IQueryable<Domain.ProductionReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionReturnItemDet>> LoadItmdet(string prodord)
       {
           try
           {
               var ProductWO = repo.LoadItmdet(prodord);

               return new Response<IQueryable<Domain.ProductionReturnItemDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionReturnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> CreateUnitEntry(Domain.ProductionRecptMas MasEntry)
       {
           try
           {
                AxonApparel.Repository.Production_Recpt_Mas ProdInsert = new AxonApparel.Repository.Production_Recpt_Mas

               //var ID = repo.AddData(new AxonApparel.Repository.Production_Recpt_Mas
               {
                   prod_recpt_masid = MasEntry.prod_recpt_masid,
                   prod_recpt_no = MasEntry.prod_recpt_no,
                   prod_recpt_date = MasEntry.prod_recpt_date,
                   Recpt_Ref_date = MasEntry.Recpt_Ref_date,
                   Recpt_Ref_no = MasEntry.Recpt_Ref_no,
                   remarks = MasEntry.remarks,
                   OrderType = MasEntry.OrderType,
                   StoreUnitID = MasEntry.StoreUnitID,
                   CreatedBy = MasEntry.CreatedBy,
                   InwardNo = MasEntry.InwardNo,
                   SupplierInvoiceNo = MasEntry.SupplierInvoiceNo,
                   ExcldetoInv = MasEntry.ExcldetoInv,
                   InspDate = MasEntry.InspDate,
                   InspNo = MasEntry.InspNo,
                   EWayDate = MasEntry.EWayDate,
                   EWayNo = MasEntry.EWayNo

               };

               var ItmList = new List<Production_Recpt_Return>();

               foreach (var PItem in MasEntry.ProdRetItmDet)
               {
                   ItmList.Add(new Production_Recpt_Return
                   {

                      Production_Recpt_masid=PItem.Production_Recpt_masid,
                      ProcessJobDetid=PItem.prodjobdetid,
                      LossQty=PItem.lossqty,
                      Returnqty=PItem.retqty,
                      Production_Recpt_Retid=PItem.Production_Recpt_Retid,
                      Prod_Iss_Stockid=PItem.Prod_Iss_Stockid,
                      ProcessOrdId=PItem.prodordid,
                      CreatedBy=PItem.CreatedBy
                      


                   });

               }



               var Itm = new List<Domain.ProductionReturnItemDet>();

               foreach (var Item in MasEntry.ProdRetItmDet)
               {
                   Itm.Add(new Domain.ProductionReturnItemDet
                   {

                       prodjobdetid = Item.prodjobdetid,
                       prodorddetid = Item.prodorddetid,
                       prodordid = Item.prodordid,
                       //productionord = Item.productionord,
                       //prodprgno = Item.prodprgno,
                       //jobordno = Item.jobordno,
                       prodprgdetid = Item.prodprgdetid,
                       retqty=Item.retqty,
                       lossqty=Item.lossqty,
                       itmid=Item.itmid,
                       colorid=Item.colorid,
                       sizeid=Item.sizeid,
                       jobordno=Item.jobordno,
                       lotno=Item.lotno,
                       suppid=Item.suppid,
                       styleid=Item.styleid,

                      



                   });

               }

               var result = repo.AddDetData(ProdInsert,MasEntry.prod_recpt_no, MasEntry.processid, MasEntry.prod_recpt_date, MasEntry.companyid, MasEntry.remarks, MasEntry.StoreUnitID, MasEntry.CreatedBy, Itm, ItmList, "Add");

               return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
               // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

           }
       }


       public Response<IQueryable<Domain.ProductionRecptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid, string ordno)
       {
           try
           {
               var ProductWO = repo.LoadMaingrid(cmpid, processid, unitid, buyerid, masid, prodordid, processortype, type, dcno, recptno, fromdate, todate, Processorid, ordno);

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
       public Response<IQueryable<Domain.ProductionRecptMas>> LoadMaingridord(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid)
       {
           try
           {
               var ProductWO = repo.LoadMaingridord(cmpid, processid, unitid, buyerid, masid, prodordid, processortype, type, dcno, recptno, fromdate, todate, Processorid);

               return new Response<IQueryable<Domain.ProductionRecptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionRecptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ProductionReturnItemDet>> LoadEditItmdet(int masid, string prodord)
       {
           try
           {
               var ProductWO = repo.LoadEditItmdet(masid,prodord);

               return new Response<IQueryable<Domain.ProductionReturnItemDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ProductionReturnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
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

               var ItmList = new List<Production_Recpt_Return>();

               foreach (var PItem in objupd.ProdRetItmDet)
               {
                   ItmList.Add(new Production_Recpt_Return
                   {

                       Production_Recpt_masid = PItem.Production_Recpt_masid,
                       ProcessJobDetid = PItem.prodjobdetid,
                       LossQty = PItem.lossqty,
                       Returnqty = PItem.retqty,
                       Production_Recpt_Retid = PItem.Production_Recpt_Retid,
                       Prod_Iss_Stockid = PItem.Prod_Iss_Stockid,
                       ProcessOrdId = PItem.prodordid,
                       CreatedBy = PItem.CreatedBy



                   });

               }



               var Itm = new List<Domain.ProductionReturnItemDet>();

               foreach (var Item in objupd.ProdRetItmDet)
               {
                   Itm.Add(new Domain.ProductionReturnItemDet
                   {

                       prodjobdetid = Item.prodjobdetid,
                       prodorddetid = Item.prodorddetid,
                       prodordid = Item.prodordid,
                       //productionord = Item.productionord,
                       //prodprgno = Item.prodprgno,
                       //jobordno = Item.jobordno,
                       prodprgdetid = Item.prodprgdetid,
                       retqty = Item.retqty,
                       lossqty = Item.lossqty,
                       itmid = Item.itmid,
                       colorid = Item.colorid,
                       sizeid = Item.sizeid,
                       jobordno = Item.jobordno,
                       lotno = Item.lotno,
                       suppid = Item.suppid,
                       styleid = Item.styleid,





                   });

               }

               var result = repo.UpdDetData(ProdUpd, objupd.prod_recpt_no, objupd.processid, objupd.prod_recpt_date, objupd.companyid, objupd.remarks, objupd.StoreUnitID, objupd.CreatedBy, Itm, ItmList, "Update");

               return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
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
           var ItmList = new List<Production_Recpt_Return>();

           foreach (var PItem in DelDEntry.ProdRetItmDet)
           {
               ItmList.Add(new Production_Recpt_Return
               {

                   Production_Recpt_masid = PItem.Production_Recpt_masid,
                   ProcessJobDetid = PItem.prodjobdetid,
                   LossQty = PItem.lossqty,
                   Returnqty = PItem.retqty,
                   Production_Recpt_Retid = PItem.Production_Recpt_Retid,
                   Prod_Iss_Stockid = PItem.Prod_Iss_Stockid,
                   ProcessOrdId = PItem.prodordid,
                   CreatedBy = PItem.CreatedBy



               });

           }



           var Itm = new List<Domain.ProductionReturnItemDet>();

           foreach (var Item in DelDEntry.ProdRetItmDet)
           {
               Itm.Add(new Domain.ProductionReturnItemDet
               {

                   prodjobdetid = Item.prodjobdetid,
                   prodorddetid = Item.prodorddetid,
                   prodordid = Item.prodordid,
                   //productionord = Item.productionord,
                   //prodprgno = Item.prodprgno,
                   //jobordno = Item.jobordno,
                   prodprgdetid = Item.prodprgdetid,
                   retqty = Item.retqty,
                   lossqty = Item.lossqty,
                   itmid = Item.itmid,
                   colorid = Item.colorid,
                   sizeid = Item.sizeid,
                   jobordno = Item.jobordno,
                   lotno = Item.lotno,
                   suppid = Item.suppid,
                   styleid = Item.styleid,





               });

           }

           var result = repo.DeleteDetData(DelDEntry.prod_recpt_no, DelDEntry.processid, DelDEntry.prod_recpt_date, DelDEntry.companyid, DelDEntry.remarks, DelDEntry.StoreUnitID, DelDEntry.CreatedBy, Itm, ItmList, "Update");

           return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
       }
    }
}
