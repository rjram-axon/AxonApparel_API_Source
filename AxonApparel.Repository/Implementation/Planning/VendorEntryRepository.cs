using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;


namespace AxonApparel.Repository
{
    public class VendorEntryRepository : IVendorEntryRepository
    {
        PlanningEntities entities = new PlanningEntities();

        public int AddData(VendorQuoteMas objCmas)
        {
            var id = entities.VendorQuoteMas.Add(objCmas);
            entities.SaveChanges();
            return id.Quoteid;
        }

        public bool AddDetData(List<VendorQuoteDet> objCDet)
        {
            foreach (var item in objCDet)
            {
                entities.VendorQuoteDet.Add(item);
            }
            entities.SaveChanges();
            return true;
        }


        public IList<VendorEntry> GetDataRepItemDetails(string MasID)
        {
            var query = (from o in entities.Proc_Apparel_GetVendorOrderItemList(MasID)
                         select new VendorEntry
                         {

                             QuoteDetid = o.QuoteDetid,
                             Quoteid = o.Quoteid,
                             Itemid = o.itemid,
                             Item = o.item,
                             Colorid = o.colorid,
                             Color = o.color,
                             Sizeid = o.sizeid,
                             Size = o.size,
                             Uomid = (int)o.uomid,
                             Uom = o.uom,
                             Rate = o.Rate,
                             MinQty = o.MinQty,
                             Buy_ord_no = o.orderno,
                             MaxQty = o.MaxQty,
                             Apprate = o.Apprate,
                             Quantity = o.Quantity,
                             StyleId=o.Styleid,

                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<Vendor> GetDataVenDetails(int QMasId)
        {


            IQueryable<Vendor> query = (from a in entities.Proc_Apparel_GetVendorEditDetails(QMasId)
                                        select new Vendor
                                        {
                                            Buy_ord_no = a.Order_No,
                                            Ref_No = a.Ref_No,
                                            Supplier = a.supplier,
                                            Supplierid = a.supplierid,
                                            EntryNo = a.EntryNo,
                                            QuoteDate = (DateTime)a.QuoteDate,
                                            ActiveFrom = (DateTime)a.ActiveFrom,
                                            EntryDate = (DateTime)a.Entrydate,
                                            QuoteNo = a.QuoteNo,
                                            Quoteid = a.Quoteid,
                                            BuyOrdGeneral = a.BuyOrGen,
                                            AutoManual = a.AutoManual,
                                            CurrencyId = a.CurrencyId,
                                            Currency = a.Currency,
                                            Companyid = a.companyid,
                                            Company = a.company,
                                            SAdd1 = a.Address1,
                                            SAdd2 = a.Address2,
                                            SAdd3 = a.Address3,
                                            Buyer = a.Buyer,
                                            Quantity = a.Qty,
                                            Exchangerate=(int)a.Exchangerate,
                                            BuyerId=a.BuyerId,
                                            Buy_Ord_MasId=a.Buy_Ord_MasId,
                                            Remarks=a.remarks,



                                        }).AsQueryable();

            return query;
        }

        public IList<VendorEntry> GetDataEditVenDetails(int MasId)
        {


            var query = (from Ec in entities.Proc_Apparel_GetVenEditDetDetails(MasId)
                         select new VendorEntry
                         {
                             QuoteDetid = Ec.QuoteDetid,
                             Quoteid = Ec.Quoteid,
                             Itemid = Ec.itemid,
                             Item = Ec.item,
                             Colorid = Ec.colorid,
                             Color = Ec.color,
                             Sizeid = Ec.sizeid,
                             Size = Ec.size,
                             Uomid = (int)Ec.uomid,
                             Uom = Ec.uom,
                             Rate = (int)Ec.rate,
                             MinQty = (int)Ec.minqty,
                             Buy_ord_no = Ec.orderno,
                             MaxQty = (int)Ec.MaxQty,
                            // Apprate = Ec.ao,
                             Quantity = (int)Ec.quantity,
                         }).AsQueryable();

            return query.ToList();



        }
        public IList<VendorEntry> GetPurQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid, int Compid)
        {


            var query = (from Ec in entities.Proc_Apparel_GetPurQuoteforPlan(WorkordNo, itemid, Colorid, Sizeid, Compid)
                         select new VendorEntry
                         {
                             Rate = (int)Ec.rate,
                             MinQty = (int)Ec.MinQty,
                             EntryNo=Ec.EntryNo,
                             Supplier=Ec.Supplier,
                             MaxQty = (int)Ec.MaxQty,

                         }).AsQueryable();

            return query.ToList();



        }


        public bool UpdateData(VendorQuoteMas objAd)
        {
            var result = false;

            var App = entities.VendorQuoteMas.Where(c => c.Quoteid == objAd.Quoteid).FirstOrDefault();
            if (App != null)
            {
                        
                    App.Quoteid = objAd.Quoteid;
                    App.QuoteNo = objAd.QuoteNo;
                    App.QuoteDate = objAd.QuoteDate;
                    App.EntryNo = objAd.EntryNo;
                    App.EntryDate = objAd.EntryDate;
                    App.AutoManual = objAd.AutoManual;
                    App.Supplierid = objAd.Supplierid;
                    App.BuyOrdGeneral = objAd.BuyOrdGeneral;
                    App.Buy_ord_no = objAd.Buy_ord_no;
                    //Buy_Ord_MasId=VEnt.Buy_Ord_MasId,
                    App.Remarks = objAd.Remarks;
                    App.Companyid = objAd.Companyid;
                    App.Commit_Cancel = objAd.Commit_Cancel;
                    App.CurrencyId = objAd.CurrencyId;
                    App.CreatedBy = objAd.CreatedBy;
                    App.Exchangerate = objAd.Exchangerate;
                    App.ActiveFrom = objAd.ActiveFrom;
                    //APPROVALDATE=VEnt.APPROVALDATE,
                    //APPROVEDBY = VEnt.APPROVEDBY,
                    App.ApprovedStatus = objAd.ApprovedStatus;
            }
            entities.SaveChanges();
            result = true;
            return result;
        }

        public bool UpdateDetData(List<VendorQuoteDet> objAdDet)
        {
            var result = false;
       

            foreach (var i in objAdDet)
            {
                var c = entities.VendorQuoteDet.Where(a => a.QuoteDetid.Equals(i.QuoteDetid)).FirstOrDefault();
                if (c != null)
                {

                        c.QuoteDetid = i.QuoteDetid;
                        c.Quoteid = i.Quoteid;
                        c.Itemid = i.Itemid;
                        c.Colorid = i.Colorid;
                        c.Sizeid = i.Sizeid;
                        c.Uomid = i.Uomid;
                        c.Quantity = i.Quantity;
                        c.Rate = i.Rate;
                        c.MinQty = i.MinQty;
                        c.Apprate = i.Apprate;
                        //AppDate=item.AppDate,
                        c.Buy_ord_no = i.Buy_ord_no;
                      
                        c.MaxQty = i.MaxQty;
                }
            }

            entities.SaveChanges();
            result = true;
            return result;
        }


        public bool AddEditDetData(List<VendorQuoteDet> objCDet)
        {
            foreach (var item in objCDet)
            {
                if (item.QuoteDetid == 0)
                {
                    entities.VendorQuoteDet.Add(item);
                }
            }
            entities.SaveChanges();
            return true;
        }
    }
}
