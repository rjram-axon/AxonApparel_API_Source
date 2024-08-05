using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;

namespace AxonApparel.Repository
{
    public class ProcessQuoteEntryRepository : IProcessQuoteEntryRepository
    {
        PlanningEntities entities = new PlanningEntities();
        public int QPRID = 0;
        public int PsNo = 0;
        public int AddData(Process_Quote objCmas)
        {
            var id = entities.Process_Quote.Add(objCmas);
            entities.SaveChanges();
            return id.Process_Quoteid;
        }


        public bool AddDetPrData(List<Process_QuotePro> objCDet, List<Process_Quote_Det> objCPDet)
        {
            foreach (var itemCDet in objCPDet)
            {
                PsNo = (int)itemCDet.PsNo;

                foreach (var item in objCDet)
                {
                    if (PsNo == item.PsNo && item.Process_QuoteProid == 0)
                    {
                        entities.Process_QuotePro.Add(item);
                        entities.SaveChanges();
                        QPRID = item.Process_QuoteProid;
                    }
                    else if (PsNo == item.PsNo && item.Process_QuoteProid > 0)
                    {
                        QPRID = item.Process_QuoteProid;
                    }
                    foreach (var itemDet in objCPDet)
                    {
                    if (itemCDet.PsNo == item.PsNo)
                        {
                            itemCDet.Process_QuoteProid = QPRID;
                        }
                    }

                }

                entities.Process_Quote_Det.Add(itemCDet);
            }
            entities.SaveChanges();
            return true;
        }


        public IQueryable<ProcessQuote> GetDataEditRepDetails(int PQMasId)
        {

            IQueryable<ProcessQuote> query = (from a in entities.Proc_Apparel_GetProcessQuoteEditDetails(PQMasId)
                                              select new ProcessQuote
                                        {
                                            Buy_ord_no = a.Order_No,
                                            BRefNo = a.Ref_No,
                                            Supplier = a.supplier,
                                            Processorid = a.supplierid,
                                            Process_Quoteid = a.Quoteid,
                                            Process_QuoteNo = a.QuoteNo,
                                            Process_QuoteDate = (DateTime)a.Process_QuoteDate,
                                            RefDate = (DateTime)a.RefDate,
                                            RefNo = a.PQRefNo,
                                            BuyOrdGeneral = a.BuyOrGen,
                                            companyid = a.companyid,
                                            company = a.company,
                                            Commit_Cancel = a.Commit_Cancel,
                                            Add1 = a.Address1,
                                            Add2 = a.Address2,
                                            Add3 = a.Address3,
                                            Buy_ord_masId = a.Buy_Ord_MasId,
                                            Style = a.style,
                                            StyleId = a.Styleid,
                                            JobId = a.JID,
                                            JobNo = a.JobNo,
                                            Remarks = a.remarks,

                                        }).AsQueryable();

            return query;
        }


        public IList<ProProcessQuote> GetEditPQPRRepDetList(int PQMasId)
        {
            var query = (from EPQ in entities.Proc_Apparel_GetPQProcessEditDetDetails(PQMasId)
                         select new ProProcessQuote
                         {
                             Process_QuoteProid = EPQ.Process_QuoteProid,
                             Process_Quoteid = EPQ.Process_Quoteid,
                             Processid = EPQ.processid,
                             Process = EPQ.Process,
                             JobMasId = EPQ.JobMasId,
                             PsNo = EPQ.PsNo,
                             Job_ord_no = EPQ.JobNo,
                             ListChk = 0,
                             DelChk=0,
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<ProcessQuoteDet> GetDataEditPQIRepDetails(int PQMasId)
        {
            var query = (from ECI in entities.Proc_Apparel_GetPQItemEditDetDetails(PQMasId)
                         select new ProcessQuoteDet
                         {
                             Process_Quote_detid = ECI.Process_Quote_detid,
                             Process_Quoteid = ECI.Process_Quoteid,
                             Process_QuoteProid = ECI.Process_QuoteProid,
                             Itemid = ECI.Itemid,
                             Item = ECI.Item,
                             Colorid = ECI.colorid,
                             Color = ECI.Color,
                             Sizeid = ECI.sizeid,
                             Size = ECI.size,
                             Uomid = (int)ECI.uomid,
                             Uom = ECI.Uom,
                             rate = (int)ECI.rate,
                             MinQty = (int)ECI.MinQty,
                             PsNo = ECI.PsNo,
                             AppRate = (int)ECI.AppRate,
                             Disable = 1,
                             DelChk=0,
                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateData(Process_Quote objAd)
        {
            var result = false;

            var App = entities.Process_Quote.Where(c => c.Process_Quoteid == objAd.Process_Quoteid).FirstOrDefault();
            if (App != null)
            {

                App.Process_Quoteid = objAd.Process_Quoteid;
                App.RefNo = objAd.RefNo;
                App.RefDate = objAd.RefDate;
                App.companyid = objAd.companyid;
                App.Process_QuoteDate = objAd.Process_QuoteDate;
                App.Process_QuoteNo = objAd.Process_QuoteNo;
                App.Processorid = objAd.Processorid;
                App.BuyOrdGeneral = objAd.BuyOrdGeneral;
                App.Buy_ord_no = objAd.Buy_ord_no;
                App.Remarks = objAd.Remarks;
                App.Commit_Cancel = objAd.Commit_Cancel;
            }
            entities.SaveChanges();
            result = true;
            return result;
        }

        public bool UpdateDetData(List<Process_QuotePro> deldetprolist,List<Process_QuotePro> objAdDet)
        {
            var result = false;
            if (deldetprolist.Count > 0)
            {
                foreach (var d in deldetprolist)
                {
                    var Id = d.Process_QuoteProid;
                    var Det = entities.Process_QuotePro.Where(u => u.Process_QuoteProid == Id);
                    foreach (var u in Det)
                    {
                        entities.Process_QuotePro.Remove(u);
                    }
                }
            }

            foreach (var i in objAdDet)
            {
                var c = entities.Process_QuotePro.Where(a => a.Process_QuoteProid.Equals(i.Process_QuoteProid)).FirstOrDefault();
                if (c != null)
                {

                    c.Process_QuoteProid = i.Process_QuoteProid;
                    c.Process_Quoteid = i.Process_Quoteid;
                    c.Processid = i.Processid;
                    c.Job_ord_no = i.Job_ord_no;
                    c.PsNo = i.PsNo;
                }
            }

            entities.SaveChanges();
            result = true;
            return result;
        }


        public bool UpdateItemDetData(List<Process_Quote_Det> DelDetItemList, List<Process_Quote_Det> objAdItemDet)
        {
            var result = false;
            if (DelDetItemList.Count > 0)
            {
                foreach (var d in DelDetItemList)
                {
                    var Id = d.Process_Quote_detid;
                    var Det = entities.Process_Quote_Det.Where(u => u.Process_Quote_detid == Id);
                    foreach (var u in Det)
                    {
                        entities.Process_Quote_Det.Remove(u);
                    }
                }
            }
            

            foreach (var i in objAdItemDet)
            {
                var d = entities.Process_Quote_Det.Where(a => a.Process_Quote_detid.Equals(i.Process_Quote_detid)).FirstOrDefault();
                if (d != null)
                {



                    d.Process_Quoteid = i.Process_Quoteid;
                    d.Process_QuoteProid = i.Process_QuoteProid;
                    d.Itemid = i.Itemid;
                    d.colorid = i.colorid;
                    d.sizeid = i.sizeid;
                    d.uomid = i.uomid;
                    d.rate = i.rate;
                    d.MinQty = i.MinQty;
                    d.AppRate = i.AppRate;
                    d.Process_Quote_detid = i.Process_Quote_detid;
                    d.PsNo = i.PsNo;
                }
            }

            entities.SaveChanges();
            result = true;
            return result;
        }
        public IQueryable<ProcessQuote> GetDataOrdDetails(int Id)
        {


            IQueryable<ProcessQuote> query = (from a in entities.Proc_Apparel_GetOrderListDetails(Id)
                                              select new ProcessQuote
                                                    {
                                                        Buy_ord_no = a.OrderNo,
                                                        RefNo = a.RefNo,
                                                        Style = a.Style,
                                                        StyleId = a.StyleId,
                                                        company = a.Company,
                                                        companyid = a.CompanyId,
                                                        JobId = a.JobId,
                                                        JobNo = a.JobNo,
                                                        Buy_ord_masId = a.BMasId,



                                                    }).AsQueryable();

            return query;
        }




        public IList<ProProcessQuote> GetOrdPQPRRepDetList(string JobNo)
        {
            var query = (from OPQ in entities.Proc_Apparel_GetProcessQuoteProDetails(JobNo)
                         select new ProProcessQuote
                         {

                             Processid = (int)OPQ.processid,
                             Process = OPQ.process,
                             JobMasId = OPQ.JobId,
                             PsNo = (int)OPQ.PsNo,
                             Job_ord_no = OPQ.JobNo,
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProcessQuoteDet> GetProcessQuoteforPlan(string WorkordNo, int itemid, int Colorid, int Sizeid, int Processid, int Compid)
        {
            var query = (from OPQ in entities.Proc_Apparel_GetProcessQuoteforPlan(WorkordNo, itemid, Colorid, Sizeid,Processid, Compid)
                         select new ProcessQuoteDet
                         {

                             rate = (int)OPQ.rate,
                             MinQty = (int)OPQ.MinQty,
                             QuoteNo = OPQ.Process_QuoteNo,
                             Supplier = OPQ.Supplier,
                            
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProcessQuoteDet> GetOrdItemDet(string JobNo, int ProcessId)
        {
            var query = (from ECO in entities.Proc_Apparel_GetProcessDetQuoteProDetails(JobNo, ProcessId)
                         select new ProcessQuoteDet
                         {
                             Process_Quote_detid = ECO.Process_Quote_detid,
                             Process_Quoteid = ECO.Process_Quoteid,
                             Process_QuoteProid = ECO.Process_QuoteProid,

                             Itemid = (int)ECO.itemid,
                             Item = ECO.item,
                             Colorid = (int)ECO.colorid,
                             Color = ECO.color,
                             Sizeid = (int)ECO.sizeid,
                             Size = ECO.size,
                             Uomid = (int)ECO.uomid,
                             Uom = ECO.uom,
                             rate = (int)ECO.rate,
                             MinQty = (int)ECO.MinQty,
                             PsNo = (int)ECO.PsNo,
                             AppRate = (int)ECO.AppRate,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProcessQuote> GetRepOrdDetails(int PQMasId)
        {
            var query = (from OPEQ in entities.Proc_Apparel_GetOrderDetails(PQMasId)
                         select new ProcessQuote
                         {


                             Buy_ord_masId = OPEQ.BMasId,
                             JobId = OPEQ.JobId,
                             JobNo = OPEQ.JobNo,
                             Buy_ord_no = OPEQ.Order_No,
                             Style = OPEQ.Style,
                             StyleId = OPEQ.StyleId,
                             RefNo = OPEQ.RefNo,


                         }).AsQueryable();

            return query.ToList();
        }
    }
}
