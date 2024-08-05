using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Data.Entity.Validation;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class OrderSecondsSalesRepository : IOrderSecondsSalesRepository
    {
        ProductionEntities entities = new ProductionEntities();

        public IQueryable<DespatchAddGridDetail> GetDespatchAddGridDet(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid)
        {
            IQueryable<DespatchAddGridDetail> query = (from T in entities.Proc_Apparel_GetOrderSalesInvAddGridDetail(CompanyId, OrderType, RefNo, storeid, OrderNo, Buyerid)
                                                       select new DespatchAddGridDetail
                                                       {
                                                           ShipRowID = T.ShiprowID,
                                                           BuyOrdShip = T.Buy_ord_Ship,
                                                           Buyer = T.Buyer,
                                                           OrderNo = T.Order_No,
                                                           RefNo = T.Ref_No,
                                                           Style = T.style,
                                                           Destination = T.country,
                                                           ShipDate = (DateTime)T.ShipDate,
                                                           ProductionQty = (decimal)T.ProductionQty,
                                                           BalanceQty = (decimal)T.BalanceQty,
                                                           CheckLoad = "N"
                                                       }).AsQueryable();
            return query;
        }

        public Domain.OrderSalesInvoiceMas GetDespatchInnerHeaderInfo(int Invid)
        {
            ProductionEntities entities = new ProductionEntities();

            Domain.OrderSalesInvoiceMas query = (from DespatAdd in entities.Proc_Apparel_GetOrderSalesInvmasEdit(Invid)
                                                 select new Domain.OrderSalesInvoiceMas
                                         {
                                             Invid = DespatAdd.Invid,
                                             companyid = DespatAdd.companyid,
                                             buyerid = DespatAdd.buyerid,
                                             conssigneeid = DespatAdd.conssigneeid,
                                             notify = DespatAdd.notify,
                                             InvoiceNo = DespatAdd.InvoiceNo,
                                             invoicedate = DespatAdd.invoicedate,
                                             refno = DespatAdd.refno,
                                             refdate = DespatAdd.refdate,
                                             portofloading = DespatAdd.portofloading,
                                             destination = DespatAdd.destination,
                                             portofdischarge = DespatAdd.portofdischarge,
                                             shipmode = DespatAdd.shipmode,
                                             systemid = DespatAdd.systemid,
                                             payment = DespatAdd.payment,
                                             Precarriage = DespatAdd.Precarriage,
                                             placeofrecpt = DespatAdd.placeofrecpt,
                                             Vesselno = DespatAdd.Vesselno,
                                             MarksNos = DespatAdd.MarksNos,
                                             Totalcartons = DespatAdd.Totalcartons,
                                             Totalgrosswgt = DespatAdd.Totalgrosswgt,
                                             Totalnetwgt = DespatAdd.Totalnetwgt,
                                             currencyid = DespatAdd.currencyid,
                                             Exrate = DespatAdd.Exrate,
                                             SBillNo = DespatAdd.SBillNo,
                                             SBillDate = DespatAdd.SBillDate,
                                             CTDNo = DespatAdd.CTDNo,
                                             CTDDate = DespatAdd.CTDDate,
                                             LCNo = DespatAdd.LCNo,
                                             LCDate = DespatAdd.LCDate,
                                             LCtype = DespatAdd.LCtype,
                                             Statement = DespatAdd.Statement,
                                             StatementCode = DespatAdd.StatementCode,
                                             StatementType = DespatAdd.StatementType,
                                             SchemeCode = DespatAdd.SchemeCode,
                                             ContainerNo = DespatAdd.ContainerNo,
                                            
                                             
                                         }).FirstOrDefault();
            return query;
        }


        public IQueryable<Domain.OrderSalesInvoiceAddless> GetAddlessDetails(int Invid)
        {
            var query = (from IO in entities.Proc_Apparel_GetSalesInvEditAddlessDetails(Invid)
                         select new Domain.OrderSalesInvoiceAddless
                         {
                            InvId = (int)IO.AddlessId,
                            InvAddLessid = (int)IO.AddlessId,
                            addless_id = (int)IO.AddlessId,
                            Addless = IO.Addless,
                            aorl = IO.Type,
                            percentage = (decimal)IO.Percentage,
                            amount = (decimal)IO.Amount,

                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.OrderSalesInvoiceDet> GetDespatchInnerItemDetail(int Invid)
        {
            ProductionEntities entities = new ProductionEntities();

            IQueryable<Domain.OrderSalesInvoiceDet> query = (from T in entities.Proc_Apparel_GetOrderSalesInvDetEdit(Invid)
                                                     select new Domain.OrderSalesInvoiceDet
                                                     {
                                                         Invdetid = T.Invdetid,
                                                         Invid = T.Invid,
                                                         Itemid = T.ITEMID,
                                                         OrderNo = T.Order_No,
                                                         Articleno = T.Articleno,
                                                         HsCode = T.HsCode,
                                                         description =T.descid,
                                                         qty = T.invqty,
                                                         rate = T.rate,
                                                         amount = T.amount,
                                                         CompanyId = T.CompanyId,
                                                         Order_No = T.Order_No,
                                                         Buyer_Ref_No = T.Buyer_Ref_No,
                                                         ShipRowId = T.ShipRowId,
                                                         BuyerId = T.BuyerId,
                                                         Destination = T.Destination,
                                                         PortOfLoadingId = T.PortOfLoadingId,
                                                         shipmode = T.shipmode,
                                                         System = T.System,
                                                         Paymentmode = T.Paymentmode,
                                                         item = T.item,
                                                         OrderRefno = T.Ref_No,
                                                         Style = T.Style,
                                                         Styleid = T.StyleId,
                                                         Ordqty = (decimal)T.OrderQty,
                                                         Prodqty = (decimal)T.ProductionQty,
                                                         balqty = (decimal)(T.Balqty +T.invqty),
                                                         Fcarton = T.Fcarton,
                                                         Tcarton = T.Tcarton,
                                                         Totcarton = T.Totcarton,
                                                         Shipno=T.Buy_Ord_Ship,
                                                         //currencyid = T.currencyid,
                                                         //Exrate = T.Exrate,
                                                         Sno=(int)T.Sno,
                                                         GRwgt=T.GRwgt,
                                                         NETwgt=T.NETwgt
                                                     }).AsQueryable();
            return query;
        }

        public IQueryable<Domain.OrderSalesInvoiceDet> GetDespatchInnerItemDetailDespatch(int Invid)
        {
            ProductionEntities entities = new ProductionEntities();

            IQueryable<Domain.OrderSalesInvoiceDet> query = (from T in entities.Proc_Apparel_GetOrderSalesDetailforDespatch(Invid)
                                                             select new Domain.OrderSalesInvoiceDet
                                                             {
                                                                 Invid = T.Invid,
                                                                 Itemid = T.ITEMID,
                                                                 OrderNo = T.Order_No,
                                                                 rate = T.rate,
                                                                 CompanyId = T.CompanyId,
                                                                 Order_No = T.Order_No,
                                                                 Buyer_Ref_No = T.Buyer_Ref_No,
                                                                 ShipRowId = T.ShipRowId,
                                                                 BuyerId = T.BuyerId,
                                                                 Destination = T.Destination,
                                                                 PortOfLoadingId = T.PortOfLoadingId,
                                                                 shipmode = T.shipmode,
                                                                 System = T.System,
                                                                 Paymentmode = T.Paymentmode,
                                                                 item = T.item,
                                                                 OrderRefno = T.Ref_No,
                                                                 Styleid = T.StyleId,
                                                                 Shipno = T.Buy_Ord_Ship,
                                                             }).AsQueryable();
            return query;
        }
 
        public IList<DespatchMainGridProperty> GetMainData(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid)
        {
            // AxonApparelEntities entities = new AxonApparelEntities();

            var query = (from a in entities.Proc_Apparel_GetOrderSalesInvMain(CompanyId, Buyerid, OrderNo, RefNo, Fromdate, Todate, OrderType)
                         select new DespatchMainGridProperty
                         {
                             DespatchID = a.Invid,
                             DespatchNo = a.InvoiceNo,
                             DespatchDate = (DateTime)a.invoicedate,
                             Destination = a.Destination,
                             Buyer = a.Buyer,
                             DocRefNo = a.RefNo,
                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Domain.OrderSalesInvoiceDet> GetAddItemDetails(string ShipRowId)
        {

            IQueryable<Domain.OrderSalesInvoiceDet> query = (from T in entities.Proc_Apparel_LoadDetailsforSalesInv(ShipRowId)
                                                             select new Domain.OrderSalesInvoiceDet
                                                     {
                                                         Invdetid = 0,
                                                         Invid = 0,
                                                         Itemid = T.ITEMID,
                                                         OrderNo = T.Order_No,
                                                         Articleno = T.Articleno,
                                                         HsCode = "",
                                                         description = 0,
                                                         qty = 0,
                                                         rate = 0,
                                                         amount = 0,
                                                         CompanyId = T.CompanyId,
                                                         Order_No = T.Order_No,
                                                         Buyer_Ref_No = T.Buyer_Ref_No,
                                                         ShipRowId = T.ShipRowId,
                                                         BuyerId = T.BuyerId,
                                                         Destination = T.Destination,
                                                         PortOfLoadingId = T.PortOfLoadingId,
                                                         shipmode = T.shipmode,
                                                         System = T.System,
                                                         Paymentmode = T.Paymentmode,
                                                         item = T.item,
                                                         OrderRefno = T.Ref_No,
                                                         Style = T.Style,
                                                         Styleid = T.StyleId,
                                                         Ordqty = (decimal)T.OrderQty,
                                                         Prodqty = (decimal)T.ProductionQty,
                                                         balqty = (decimal)T.Balqty,
                                                         Fcarton = 0,
                                                         Tcarton = 0,
                                                         Totcarton = 0,
                                                         currencyid=T.CurrencyId,
                                                         Exrate=T.Exchange,
                                                         Sno=(int)T.Sno,
                                                         GRwgt = 0,
                                                         NETwgt = 0
                                                     }).AsQueryable();
            return query;
        }

        public IList<Domain.OrderSalesInvoiceMas> GetInvdet(int compid)
        {

             var  query = entities.OrderSalesInvoiceMas.Where(e=>e.companyid==compid).ToList();
             IList<Domain.OrderSalesInvoiceMas> maslist = new List<Domain.OrderSalesInvoiceMas>();
             foreach (var b in query) {
                 Domain.OrderSalesInvoiceMas mas = new Domain.OrderSalesInvoiceMas()
                 {
                     Invid=b.Invid,
                     InvoiceNo=b.InvoiceNo
                 };

                 maslist.Add(mas);
             }

             return maslist;
        }

        public bool Add(OrderSalesInvoiceMas objAdd, List<OrderSalesInvoiceDet> detlist, List<OrderSalesInvoiceAddless> Accobj)
        {
            int invid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    entities.OrderSalesInvoiceMas.Add(objAdd);
                    entities.SaveChanges();
                    invid = objAdd.Invid;

                    //Insert into DespatchDet
                    if (detlist.Count > 0)
                    {
                        foreach (var item in detlist)
                        {
                            if (item.qty > 0)
                            {

                                item.Invid = invid;
                                entities.OrderSalesInvoiceDet.Add(item);
                                entities.SaveChanges();

                            }
                        }
                    }


                    if (Accobj.Count > 0)
                    {
                        foreach (var acc in Accobj)
                        {
                                acc.InvId = invid;
                                entities.OrderSalesInvoiceAddless.Add(acc);
                                entities.SaveChanges();

                        }
                    }



                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool Update(OrderSalesInvoiceMas objAdd, List<OrderSalesInvoiceDet> detlist, List<OrderSalesInvoiceAddless> Accobj)
        {
            int invid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var masupd = entities.OrderSalesInvoiceMas.Where(e => e.Invid == objAdd.Invid).FirstOrDefault();

                    masupd.invoicedate = objAdd.invoicedate;
                    masupd.MarksNos = objAdd.MarksNos;
                    masupd.notify = objAdd.notify;
                    masupd.placeofrecpt = objAdd.placeofrecpt;
                    masupd.portofdischarge = objAdd.portofdischarge;
                    masupd.Precarriage = objAdd.Precarriage;
                    masupd.refdate = objAdd.refdate;
                    masupd.refno = objAdd.refno;
                    masupd.shipmode = objAdd.shipmode;
                    masupd.systemid = objAdd.systemid;
                    masupd.Totalcartons = objAdd.Totalcartons;
                    masupd.Totalgrosswgt = objAdd.Totalgrosswgt;
                    masupd.Totalnetwgt = objAdd.Totalnetwgt;
                    masupd.Vesselno = objAdd.Vesselno;
                    masupd.currencyid = objAdd.currencyid;
                    masupd.Exrate = objAdd.Exrate;
                    masupd.SBillNo = objAdd.SBillNo;
                    masupd.SBillDate = objAdd.SBillDate;
                    masupd.CTDNo = objAdd.CTDNo;
                    masupd.CTDDate = objAdd.CTDDate;
                    masupd.LCNo = objAdd.LCNo;
                    masupd.LCDate = objAdd.LCDate;
                    masupd.LCtype = objAdd.LCtype;
                    masupd.Statement = objAdd.Statement;
                    masupd.StatementCode = objAdd.StatementCode;
                    masupd.StatementType = objAdd.StatementType;
                    masupd.SchemeCode = objAdd.SchemeCode;
                    masupd.ContainerNo = objAdd.ContainerNo;



                    entities.SaveChanges();
                    invid = objAdd.Invid;


                    var removedetlist = entities.OrderSalesInvoiceDet.Where(d => d.Invid == invid).ToList();

                    foreach (var item in removedetlist)
                    {
                        entities.OrderSalesInvoiceDet.Remove(item);
                        entities.SaveChanges();
                    }

                    var removeacclist = entities.OrderSalesInvoiceAddless.Where(d => d.InvId == invid).ToList();

                    foreach (var accd in removeacclist)
                    {
                        entities.OrderSalesInvoiceAddless.Remove(accd);
                        entities.SaveChanges();
                    }



                    //Insert into DespatchDet
                    if (detlist.Count > 0)
                    {
                        foreach (var item in detlist)
                        {
                            if (item.qty > 0)
                            {

                                item.Invid = invid;
                                entities.OrderSalesInvoiceDet.Add(item);
                                entities.SaveChanges();

                            }
                        }
                    }

                    if (Accobj.Count > 0)
                    {
                        foreach (var acc in Accobj)
                        {
                            acc.InvId = invid;
                            entities.OrderSalesInvoiceAddless.Add(acc);
                            entities.SaveChanges();

                        }
                    }



                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool Delete(OrderSalesInvoiceMas objAdd, List<OrderSalesInvoiceDet> detlist, List<OrderSalesInvoiceAddless> Accobj)
        {
            int invid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var removedetlist = entities.OrderSalesInvoiceDet.Where(d => d.Invid == objAdd.Invid).ToList();

                    foreach (var item in removedetlist)
                    {
                        entities.OrderSalesInvoiceDet.Remove(item);
                        entities.SaveChanges();
                    }

                    var removeacclist = entities.OrderSalesInvoiceAddless.Where(d => d.InvId == objAdd.Invid).ToList();

                    foreach (var accd in removeacclist)
                    {
                        entities.OrderSalesInvoiceAddless.Remove(accd);
                        entities.SaveChanges();
                    }


                    var Masdet = entities.OrderSalesInvoiceMas.Where(d => d.Invid == objAdd.Invid).FirstOrDefault();
                    entities.OrderSalesInvoiceMas.Remove(Masdet);

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }
    }
}
