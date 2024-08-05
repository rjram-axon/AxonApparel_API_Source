using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class QuotationAddRepository : IQuotationAddRepository
    {
        OrderEntities entities = new OrderEntities();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IQueryable<Domain.MarkQuoteProcess> Getprocess()
        {
            IQueryable<Domain.MarkQuoteProcess> query = (from cd1 in entities.Proc_Apparel_Quotationgetprocess()
                                                         select new Domain.MarkQuoteProcess
                                                         {
                                                             ProcessId = cd1.ProcessId,
                                                             process = cd1.Process


                                                         }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.MarkQuoteAcc> Getuom(int itemid)
        {
            IQueryable<Domain.MarkQuoteAcc> query = (from cd1 in entities.Proc_Apparel_Quotationgetuom(itemid)
                                                     select new Domain.MarkQuoteAcc
                                                     {
                                                         uom = cd1.Uom,
                                                         Uomid = cd1.UomId

                                                     }).AsQueryable();
            return query;
        }

        public int AddData(MarkQuoteMas objEntry, List<MarkQuoteFab> fab, List<MarkQuoteYarn> yarn, List<MarkQuoteProcess> process, List<MarkQuoteAcc> bom, List<MarkQuoteCMT> cmt, List<MarkQuoteCommercial> comm, string Mode, int qid = 0)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.MarkQuoteMas.Add(objEntry);
                    entities.SaveChanges();

                    var addDet = AddDetData(id.QuoteID, fab, yarn, process, bom, cmt, comm, "Add");

                    var addAmendDet = AddAmendDetData(objEntry, fab, yarn, process, bom, cmt, comm, "Add");

                    if (addDet == true && addAmendDet == true)
                    {
                        txscope.Complete();
                        return id.QuoteID;
                    }
                    else
                    {
                        txscope.Dispose();
                        return 0;
                    }
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    //exceplogg.SendExcepToDB(ex, "Trims-AddData");
                    return 0;
                    throw ex;
                }
            }
        }

        public bool AddDetData(int quoteid, List<MarkQuoteFab> fab, List<MarkQuoteYarn> yarn, List<MarkQuoteProcess> process, List<MarkQuoteAcc> bom, List<MarkQuoteCMT> cmt, List<MarkQuoteCommercial> comm, string Mode, int qid = 0)
        {
            try
            {
                int id = 0;
                //Delete Records and Insert Process in Edit Case
                if (Mode == "Update")
                {
                    //fab
                    if (fab != null && fab.Count > 0)
                    {
                        foreach (var item in fab)
                        {
                            item.QuoteId = quoteid;
                            id = (int)item.QuoteId;
                        }
                    }
                    else if (qid > 0)
                    {
                        id = qid;
                    }

                    var deletedet = entities.MarkQuoteFab.Where(d => d.QuoteId == id).ToList<MarkQuoteFab>();

                    deletedet.ForEach(c => entities.MarkQuoteFab.Remove(c));
                    entities.SaveChanges();

                    //yarn
                    if (yarn != null && yarn.Count > 0)
                    {
                        foreach (var item in yarn)
                        {
                            item.QuoteId = quoteid;
                            id = (int)item.QuoteId;
                        }
                    }
                    else if (qid > 0)
                    {
                        id = qid;
                    }

                    var deletedetunit = entities.MarkQuoteYarn.Where(d => d.QuoteId == id).ToList<MarkQuoteYarn>();

                    deletedetunit.ForEach(c => entities.MarkQuoteYarn.Remove(c));
                    entities.SaveChanges();

                    //process
                    if (process != null && process.Count > 0)
                    {
                        foreach (var item in process)
                        {
                            item.QuoteID = quoteid;
                            id = (int)item.QuoteID;
                        }
                    }
                    else if (qid > 0)
                    {
                        id = qid;
                    }

                    var deleteprocess = entities.MarkQuoteProcess.Where(d => d.QuoteID == id).ToList<MarkQuoteProcess>();

                    deleteprocess.ForEach(c => entities.MarkQuoteProcess.Remove(c));
                    entities.SaveChanges();

                    //bom
                    if (bom != null && bom.Count > 0)
                    {
                        foreach (var item in bom)
                        {
                            item.QuoteId = quoteid;
                            id = (int)item.QuoteId;
                        }
                    }
                    else if (qid > 0)
                    {
                        id = qid;
                    }

                    var deletebom = entities.MarkQuoteAcc.Where(d => d.QuoteId == id).ToList<MarkQuoteAcc>();

                    deletebom.ForEach(c => entities.MarkQuoteAcc.Remove(c));
                    entities.SaveChanges();

                    //cmt
                    if (cmt != null && cmt.Count > 0)
                    {
                        foreach (var item in cmt)
                        {
                            item.QuoteId = quoteid;
                            id = (int)item.QuoteId;
                        }
                    }
                    else if (qid > 0)
                    {
                        id = qid;
                    }

                    var deletecmt = entities.MarkQuoteCMT.Where(d => d.QuoteId == id).ToList<MarkQuoteCMT>();

                    deletecmt.ForEach(c => entities.MarkQuoteCMT.Remove(c));
                    entities.SaveChanges();

                    //comm
                    if (comm != null && comm.Count > 0)
                    {
                        foreach (var item in comm)
                        {
                            item.QuoteId = quoteid;
                            id = (int)item.QuoteId;
                        }
                    }
                    else if (qid > 0)
                    {
                        id = qid;
                    }

                    var deletecomm = entities.MarkQuoteCommercial.Where(d => d.QuoteId == id).ToList<MarkQuoteCommercial>();

                    deletecomm.ForEach(c => entities.MarkQuoteCommercial.Remove(c));
                    entities.SaveChanges();

                }
                if (fab != null && fab.Count > 0)
                {
                    foreach (var item in fab)
                    {
                        item.QuoteId = quoteid;
                        entities.MarkQuoteFab.Add(item);
                    }
                    entities.SaveChanges();
                }

                if (yarn != null && yarn.Count > 0)
                {
                    foreach (var item in yarn)
                    {
                        item.QuoteId = quoteid;
                        entities.MarkQuoteYarn.Add(item);
                    }
                    entities.SaveChanges();
                }
                if (process != null && process.Count > 0)
                {
                    foreach (var item in process)
                    {
                        item.QuoteID = quoteid;
                        entities.MarkQuoteProcess.Add(item);
                    }
                    entities.SaveChanges();
                }
                if (bom != null && bom.Count > 0)
                {
                    foreach (var item in bom)
                    {
                        item.QuoteId = quoteid;
                        entities.MarkQuoteAcc.Add(item);
                    }
                    entities.SaveChanges();
                }

                if (cmt != null && cmt.Count > 0)
                {
                    foreach (var item in cmt)
                    {
                        item.QuoteId = quoteid;
                        entities.MarkQuoteCMT.Add(item);
                    }
                    entities.SaveChanges();
                }
                if (comm != null && comm.Count > 0)
                {
                    foreach (var item in comm)
                    {
                        item.QuoteId = quoteid;
                        entities.MarkQuoteCommercial.Add(item);
                    }
                    entities.SaveChanges();
                }

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddAmendDetData(MarkQuoteMas objEntry, List<MarkQuoteFab> fab, List<MarkQuoteYarn> yarn, List<MarkQuoteProcess> process, List<MarkQuoteAcc> bom, List<MarkQuoteCMT> cmt, List<MarkQuoteCommercial> comm, string Mode, int qid = 0)
        {
            int AQuoteId = 0;
            try
            {
                MarkQuoteMas_Amend MarkQMas = new MarkQuoteMas_Amend();

                if (objEntry != null)
                {
                    MarkQMas.QuoteID = objEntry.QuoteID;
                    MarkQMas.QuoteNo = objEntry.QuoteNo;
                    MarkQMas.QuoteType = objEntry.QuoteType;
                    MarkQMas.QuoteDate = objEntry.QuoteDate;
                    MarkQMas.CategoryId = (objEntry.CategoryId == 0 ? null : objEntry.CategoryId);
                    MarkQMas.Companyid = objEntry.Companyid;
                    MarkQMas.Company = objEntry.Company;
                    MarkQMas.Category = objEntry.Category;
                    MarkQMas.Buyer = objEntry.Buyer;
                    MarkQMas.BuyerId = objEntry.BuyerId;
                    MarkQMas.EnquiryId = (objEntry.EnquiryId == 0 ? null : objEntry.EnquiryId);
                    MarkQMas.StyleId = objEntry.StyleId;
                    MarkQMas.FabricCost = objEntry.FabricCost;
                    MarkQMas.AccessoryCost = objEntry.AccessoryCost;
                    MarkQMas.Commercial = objEntry.Commercial;
                    MarkQMas.CMTcost = objEntry.CMTcost;
                    MarkQMas.TotalCost = objEntry.TotalCost;
                    MarkQMas.ProfitPercent = objEntry.ProfitPercent;
                    MarkQMas.CurrencyID = objEntry.CurrencyID;
                    MarkQMas.Remarks = objEntry.Remarks;
                    MarkQMas.QuotedRate = objEntry.QuotedRate;
                    MarkQMas.CreatedBy = objEntry.CreatedBy;
                    MarkQMas.TemplateName = objEntry.TemplateName;
                    MarkQMas.OrderQty = objEntry.OrderQty;
                    MarkQMas.RefNo = objEntry.RefNo;
                    MarkQMas.PA = objEntry.PA;
                    MarkQMas.ProcessWastagePer = objEntry.ProcessWastagePer;
                    MarkQMas.BuyerPrice = objEntry.BuyerPrice;

                    var markqmas = entities.MarkQuoteMas_Amend.Add(MarkQMas);
                    entities.SaveChanges();
                    AQuoteId = MarkQMas.RecId;
                }

                var ItmList = new List<MarkQuoteFab_Amend>();

                foreach (var PItem in fab)
                {
                    ItmList.Add(new MarkQuoteFab_Amend
                    {
                        QuoteId = AQuoteId,// QID,//PItem.QuoteId,
                        DetId = PItem.DetId,
                        CompID = PItem.CompID,
                        FabID = PItem.FabID,
                        Weight = PItem.Weight,
                        Remarks = PItem.Remarks,
                        Fab_purchase = PItem.Fab_purchase,
                        BaseQty = PItem.BaseQty,
                        Uomid = PItem.Uomid,
                        GSM = PItem.GSM
                    });
                }

                var yarnList = new List<MarkQuoteYarn_Amend>();

                foreach (var yItem in yarn)
                {
                    yarnList.Add(new MarkQuoteYarn_Amend
                    {
                        Markquoteyarnid = yItem.Markquoteyarnid,
                        QuoteId = AQuoteId,//QID,// yItem.QuoteId,
                        FabID = yItem.FabID,
                        Itemid = yItem.Itemid,
                        Sizeid = yItem.Sizeid,
                        Percentage = yItem.Percentage,
                        Weight = yItem.Weight,
                        CostPerKG = yItem.CostPerKG,
                    });
                }

                var processList = new List<MarkQuoteProcess_Amend>();

                foreach (var prItem in process)
                {
                    processList.Add(new MarkQuoteProcess_Amend
                    {
                        QuoteID = AQuoteId,//QID,// yItem.QuoteId,
                        ProcessId = prItem.ProcessId,
                        Fabricid = prItem.Fabricid,
                        Cost = prItem.Cost,
                        Detid = prItem.Detid,
                    });
                }
                var bomList = new List<MarkQuoteAcc_Amend>();

                foreach (var bomItem in bom)
                {
                    bomList.Add(new MarkQuoteAcc_Amend
                    {
                        MarkquoteaccId = bomItem.MarkquoteaccId,
                        QuoteId = AQuoteId,//QID,// yItem.QuoteId,
                        ItemID = bomItem.ItemID,
                        Uomid = bomItem.Uomid,
                        Quantity = bomItem.Quantity,
                        UnitCost = bomItem.UnitCost,
                        Remarks = bomItem.Remarks,
                        ItemType = bomItem.ItemType,
                    });
                }

                var cmtList = new List<MarkQuoteCMT_Amend>();

                foreach (var cmtItem in cmt)
                {
                    cmtList.Add(new MarkQuoteCMT_Amend
                    {
                        MarkquoteCmtId = cmtItem.MarkquoteCmtId,
                        QuoteId = AQuoteId,//QID,// yItem.QuoteId,
                        ProcessID = cmtItem.ProcessID,
                        Cost = cmtItem.Cost,
                        Remarks = cmtItem.Remarks,
                    });
                }

                var commList = new List<MarkQuoteCommercial_Amend>();

                foreach (var bomItem in comm)
                {
                    commList.Add(new MarkQuoteCommercial_Amend
                    {
                        MarkquoteCommercialId = bomItem.MarkquoteCommercialId,
                        QuoteId = AQuoteId,// QID,// yItem.QuoteId,
                        ParticularID = bomItem.ParticularID,
                        Cost = bomItem.Cost,
                        Remarks = bomItem.Remarks,
                    });
                }

                //Insert into Amend Process
                if (ItmList != null && ItmList.Count > 0)
                {
                    foreach (var item in ItmList)
                    {
                        entities.MarkQuoteFab_Amend.Add(item);
                    }
                    entities.SaveChanges();
                }

                if (yarnList != null && yarnList.Count > 0)
                {
                    foreach (var item in yarnList)
                    {
                        entities.MarkQuoteYarn_Amend.Add(item);
                    }
                    entities.SaveChanges();
                }

                if (processList != null && processList.Count > 0)
                {
                    foreach (var item in processList)
                    {
                        entities.MarkQuoteProcess_Amend.Add(item);
                    }
                    entities.SaveChanges();
                }
                if (bomList != null && bomList.Count > 0)
                {
                    foreach (var item in bomList)
                    {
                        entities.MarkQuoteAcc_Amend.Add(item);
                    }
                    entities.SaveChanges();
                }

                if (cmtList != null && cmtList.Count > 0)
                {
                    foreach (var item in cmtList)
                    {
                        entities.MarkQuoteCMT_Amend.Add(item);
                    }
                    entities.SaveChanges();
                }
                if (commList != null && commList.Count > 0)
                {
                    foreach (var item in commList)
                    {
                        entities.MarkQuoteCommercial_Amend.Add(item);
                    }
                    entities.SaveChanges();
                }

                return true;

            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public IQueryable<Domain.MarkQuoteMas> Getmasdet(int qid)
        {
            IQueryable<Domain.MarkQuoteMas> query = (from cd1 in entities.proc_GetQuotationMas(qid)
                                                     select new Domain.MarkQuoteMas
                                                     {
                                                         QuoteID = cd1.QuoteID,
                                                         QuoteDate = (DateTime)cd1.QuoteDate,
                                                         QuoteNo = cd1.QuoteNo,
                                                         QuoteType = cd1.QuoteType,
                                                         Companyid = cd1.Companyid,
                                                         company = cd1.Company,
                                                         buyer = cd1.Buyer,
                                                         Guomid = (int)(cd1.GuomId == null ? 0 : cd1.GuomId),
                                                         BuyerId = cd1.BuyerId,
                                                         StyleId = cd1.StyleId,
                                                         style = cd1.Style,
                                                         EnquiryId = (int)(cd1.EnquiryId == null ? 0 : cd1.EnquiryId),
                                                         enquiryno = cd1.EnquiryNo,
                                                         FabricCost = (decimal)cd1.FabricCost,
                                                         AccessoryCost = (decimal)cd1.AccessoryCost,
                                                         CMTcost = (decimal)cd1.CMTcost,
                                                         Commercial = (decimal)cd1.Commercial,
                                                         TotalCost = (decimal)cd1.TotalCost,
                                                         ProfitPercent = (decimal)cd1.ProfitPercent,
                                                         CurrencyID = cd1.CurrencyID,
                                                         ExchangeRate = (decimal)cd1.ExchangeRate,
                                                         Remarks = cd1.Remarks,
                                                         QuotedRate = (decimal)cd1.QuotedRate,
                                                         TemplateName = cd1.TemplateName,
                                                         CreatedBy = (int)cd1.CreatedBy,
                                                         CategoryId = (int)(cd1.CategoryId == null ? 0 : cd1.CategoryId),
                                                         OrderQty = (decimal)(cd1.OrderQty == null ? 0 : cd1.OrderQty),
                                                         RefNo = cd1.RefNo,
                                                         WastagePer = (decimal)(cd1.ProcessWastagePer == null ? 0 : cd1.ProcessWastagePer),
                                                         BuyerPrice = (decimal)(cd1.BuyerPrice == null ? 0 : cd1.BuyerPrice),
                                                         EnqRef = cd1.BuyerRef,
                                                         RefStyle = cd1.BuyerStyle,
                                                         ProcessAdd = (decimal)(cd1.ProcessAdd == null ? 0 : cd1.ProcessAdd),
                                                         AccAdd = (decimal)(cd1.AccAdd == null ? 0 : cd1.AccAdd),
                                                         CMTadd = (decimal)(cd1.CMTadd == null ? 0 : cd1.CMTadd),
                                                         CommercialAdd = (decimal)(cd1.CommercialAdd == null ? 0 : cd1.CommercialAdd),
                                                         SummaryAdd = (decimal)(cd1.SummAdd == null ? 0 : cd1.SummAdd),
                                                     }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.MarkQuoteFab> Getfabdet(int qid)
        {
            IQueryable<Domain.MarkQuoteFab> query = (from cd1 in entities.proc_GetQuotationFab(qid)
                                                     select new Domain.MarkQuoteFab
                                                     {
                                                         GSM = cd1.Gsm,
                                                         Uomid = (int)cd1.UomId,
                                                         FabID = cd1.ItemId,
                                                         Fab = cd1.Item,
                                                         CompID = cd1.Compid,
                                                         Comp = cd1.Component,
                                                         BaseQty = (decimal)cd1.BaseQty,
                                                         Remarks = cd1.Remarks,
                                                         Fab_purchase = cd1.Fab_purchase,
                                                         Weight = cd1.Weight,
                                                         DetId = cd1.DetId,
                                                         SNo = (long)cd1.Sno

                                                     }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.MarkQuoteYarn> Getyarndet(int qid)
        {
            IQueryable<Domain.MarkQuoteYarn> query = (from cd1 in entities.proc_GetQuotationYarn(qid)
                                                      select new Domain.MarkQuoteYarn
                                                      {
                                                          Markquoteyarnid = cd1.Markquoteyarnid,
                                                          QuoteId = (int)cd1.QuoteId,
                                                          FabID = cd1.FabID,
                                                          Itemid = cd1.Itemid,
                                                          Sizeid = cd1.Sizeid,
                                                          Percentage = (decimal)cd1.Percentage,
                                                          Weight = (decimal)cd1.Weight,
                                                          CostPerKG = (decimal)cd1.CostPerKG,
                                                          Fab = cd1.Fabric,
                                                          item = cd1.Item,
                                                          size = cd1.Size,
                                                          SNo = (long)cd1.Sno,
                                                          ComponentId = cd1.ComponentId
                                                      }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.MarkQuoteProcess> Getprocdet(int qid)
        {
            IQueryable<Domain.MarkQuoteProcess> query = (from cd1 in entities.proc_GetQuotationProcess(qid)
                                                         select new Domain.MarkQuoteProcess
                                                         {
                                                             QuoteID = cd1.QuoteId,
                                                             SNo = (long)cd1.Sno,
                                                             Detid = cd1.Detid,
                                                             ProcessId = cd1.ProcessId,
                                                             process = cd1.Process,
                                                             Fabricid = cd1.Fabricid,
                                                             fabric = cd1.Item,
                                                             Cost = (decimal)cd1.Cost,
                                                             ComponentId=cd1.ComponentId
                                                         }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.MarkQuoteAcc> Getbomdet(int qid)
        {
            IQueryable<Domain.MarkQuoteAcc> query = (from cd1 in entities.proc_GetQuotationBom(qid)
                                                     select new Domain.MarkQuoteAcc
                                                     {
                                                         MarkquoteaccId = cd1.MarkquoteaccId,
                                                         QuoteId = cd1.QuoteId,
                                                         Quantity = (decimal)cd1.Quantity,
                                                         ItemID = cd1.ItemID,
                                                         item = cd1.Item,
                                                         ItemType = cd1.ItemType,
                                                         uom = cd1.Uom,
                                                         Uomid = cd1.Uomid,
                                                         value = (decimal)cd1.Value,
                                                         UnitCost = (decimal)cd1.UnitCost,
                                                         Remarks = cd1.Remarks,
                                                         SNo = (long)cd1.Sno



                                                     }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.MarkQuoteCMT> Getcmtdet(int qid)
        {
            IQueryable<Domain.MarkQuoteCMT> query = (from cd1 in entities.proc_GetQuotationCmt(qid)
                                                     select new Domain.MarkQuoteCMT
                                                     {
                                                         MarkquoteCmtId = cd1.MarkquoteCmtId,
                                                         QuoteId = cd1.QuoteId,
                                                         SNo = (long)cd1.Sno,
                                                         Cost = (decimal)cd1.Cost,
                                                         process = cd1.Process,
                                                         ProcessID = cd1.ProcessID,
                                                         Remarks = cd1.Remarks



                                                     }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.MarkQuoteCommercial> Getcommdet(int qid)
        {
            IQueryable<Domain.MarkQuoteCommercial> query = (from cd1 in entities.proc_GetQuotationComm(qid)
                                                            select new Domain.MarkQuoteCommercial
                                                            {
                                                                MarkquoteCommercialId = cd1.MarkquoteCommercialId,
                                                                QuoteId = cd1.QuoteId,
                                                                SNo = (long)cd1.Sno,
                                                                Remarks = cd1.Remarks,
                                                                Cost = (decimal)cd1.Cost,
                                                                particular = cd1.Commercial,
                                                                ParticularID = cd1.ParticularID



                                                            }).AsQueryable();
            return query;
        }


        public bool UpdateData(MarkQuoteMas objupd, List<MarkQuoteFab> fab, List<MarkQuoteYarn> yarn, List<MarkQuoteProcess> process, List<MarkQuoteAcc> bom, List<MarkQuoteCMT> cmt, List<MarkQuoteCommercial> comm, string Mode, int qid = 0)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.MarkQuoteMas.Where(c => c.QuoteID == objupd.QuoteID).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.QuoteID = objupd.QuoteID;
                        Upd.QuoteNo = objupd.QuoteNo;
                        Upd.QuoteType = objupd.QuoteType;
                        Upd.QuoteDate = objupd.QuoteDate;
                        Upd.CategoryId = (objupd.CategoryId == 0 ? null : objupd.CategoryId);
                        Upd.Companyid = objupd.Companyid;
                        Upd.Company = objupd.Company;
                        Upd.Category = objupd.Category;
                        Upd.Buyer = objupd.Buyer;
                        Upd.BuyerId = objupd.BuyerId;
                        Upd.EnquiryId = (objupd.EnquiryId == 0 ? null : objupd.EnquiryId);
                        Upd.StyleId = objupd.StyleId;
                        Upd.FabricCost = objupd.FabricCost;
                        Upd.AccessoryCost = objupd.AccessoryCost;
                        Upd.Commercial = objupd.Commercial;
                        Upd.CMTcost = objupd.CMTcost;
                        Upd.TotalCost = objupd.TotalCost;
                        Upd.ProfitPercent = objupd.ProfitPercent;
                        Upd.CurrencyID = objupd.CurrencyID;
                        Upd.GuomId= objupd.GuomId;
                        Upd.Remarks = objupd.Remarks;
                        Upd.QuotedRate = objupd.QuotedRate;
                        Upd.CreatedBy = objupd.CreatedBy;
                        Upd.TemplateName = objupd.TemplateName;
                        Upd.OrderQty = objupd.OrderQty;
                        Upd.RefNo = objupd.RefNo;
                        Upd.ProcessWastagePer = objupd.ProcessWastagePer;
                        Upd.BuyerPrice = objupd.BuyerPrice;
                        Upd.PA = objupd.PA;
                        Upd.Modifiedby = objupd.Modifiedby;
                        Upd.Modifieddate = DateTime.Now;
                        Upd.ProcessAdd = objupd.ProcessAdd;
                        Upd.AccAdd = objupd.AccAdd;
                        Upd.CMTadd = objupd.CMTadd;
                        Upd.CommercialAdd = objupd.CommercialAdd;
                        Upd.SummAdd = objupd.SummAdd;
                        entities.SaveChanges();

                        var addDet = AddDetData(objupd.QuoteID, fab, yarn, process, bom, cmt, comm, "Update");

                        var addAmendDet = AddAmendDetData(objupd, fab, yarn, process, bom, cmt, comm, "Add");

                        if (addDet == true && addAmendDet == true)
                        {
                            txscope.Complete();
                            result = true;
                        }
                        else
                        {
                            txscope.Dispose();
                            result = false;
                        }
                    }
                    else { result = false; }

                    return result;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public bool DeleteData(int id)
        {
            var result = false;

            //fab
            var deletedet = entities.MarkQuoteFab.Where(d => d.QuoteId == id).ToList<MarkQuoteFab>();
            deletedet.ForEach(c => entities.MarkQuoteFab.Remove(c));
            entities.SaveChanges();

            //yarn
            var deleteyarn = entities.MarkQuoteYarn.Where(d => d.QuoteId == id).ToList<MarkQuoteYarn>();
            deleteyarn.ForEach(c => entities.MarkQuoteYarn.Remove(c));
            entities.SaveChanges();

            //process
            var deletepro = entities.MarkQuoteProcess.Where(d => d.QuoteID == id).ToList<MarkQuoteProcess>();
            deletepro.ForEach(c => entities.MarkQuoteProcess.Remove(c));
            entities.SaveChanges();

            //bom
            var deletebom = entities.MarkQuoteAcc.Where(d => d.QuoteId == id).ToList<MarkQuoteAcc>();
            deletebom.ForEach(c => entities.MarkQuoteAcc.Remove(c));
            entities.SaveChanges();

            //cmt
            var deletecmt = entities.MarkQuoteCMT.Where(d => d.QuoteId == id).ToList<MarkQuoteCMT>();
            deletecmt.ForEach(c => entities.MarkQuoteCMT.Remove(c));
            entities.SaveChanges();

            //comm
            var deletecomm = entities.MarkQuoteCommercial.Where(d => d.QuoteId == id).ToList<MarkQuoteCommercial>();
            deletecomm.ForEach(c => entities.MarkQuoteCommercial.Remove(c));
            entities.SaveChanges();


            //mas
            var deleteMas = entities.MarkQuoteMas.Where(d => d.QuoteID == id).ToList<MarkQuoteMas>();
            deleteMas.ForEach(c => entities.MarkQuoteMas.Remove(c));
            entities.SaveChanges();

            entities.SaveChanges();
            result = true;
            return result;
        }

        public IQueryable<Domain.MarkQuoteMas> Getenqno(int cid)
        {
            IQueryable<Domain.MarkQuoteMas> query = (from cd1 in entities.Prc_Apparel_getquotationloadenqno(cid)
                                                     select new Domain.MarkQuoteMas
                                                     {
                                                         EnquiryId = cd1.EnquiryId,
                                                         enquiryno = cd1.EnquiryNo


                                                     }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.MarkQuoteMas> Getenqnodet(string enqno)
        {
            IQueryable<Domain.MarkQuoteMas> query = (from cd1 in entities.Prc_Apparel_getquotationloadenqnodet(enqno)
                                                     select new Domain.MarkQuoteMas
                                                     {
                                                         EnquiryId = cd1.EnquiryId,
                                                         style = cd1.Style,
                                                         StyleId = cd1.Styleid,
                                                         buyerref = cd1.BuyerRef,
                                                         buyerstyle = cd1.BuyerStyle


                                                     }).AsQueryable();
            return query;
        }
        public IEnumerable<Domain.MarkQuoteMas> GetQuotationNo()
        {
            //return entities.MarkQuoteMas.OrderBy(c => c.QuoteID);

            List<Domain.MarkQuoteMas> lstemployee = new List<Domain.MarkQuoteMas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrderProcQuoteLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.MarkQuoteMas employee = new Domain.MarkQuoteMas();
                    employee.QuoteID = Convert.ToInt32(rdr["QuoteID"]);
                    employee.QuoteNo = rdr["QuoteNo"].ToString();                  
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
    }

}
