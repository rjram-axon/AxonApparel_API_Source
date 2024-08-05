using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class GeneralMemoRepository : IGeneralMemoRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IList<Domain.GeneralMemoDet> GetItemLoad(string Itmgrpid)
        {

            string Id = "";
            if (Itmgrpid != "")
            {
                Id = Itmgrpid;
            }
            else
            {
                Id = "";
            }


            var query = (from YD in entities.Proc_Apparel_GetGenMemoItmdet(string.IsNullOrEmpty(Id) ? "" : Id)
                         select new GeneralMemoDet
                        {
                            Itemid = YD.ItemId,
                            item = YD.Item

                        }).AsQueryable();

            return query.ToList();
        }


        public int AddData(General_Memo_mas objEntry)
        {
            var id = entities.General_Memo_mas.Add(objEntry);
            entities.SaveChanges();
            return id.Gen_memo_Masid;
        }


        public bool AddDetData(General_Memo_mas obj, List<General_Memo_det> objdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    entities.General_Memo_mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.Gen_memo_Masid;
                    //if (Mode == "Update")
                    //{
                    //    if (objdet != null && objdet.Count > 0)
                    //    {
                    //        foreach (var item in objdet)
                    //        {
                    //            id = (int)item.Gen_memo_Masid;

                    //        }
                    //    }
                    //    else if (unitmId > 0)
                    //    {
                    //        id = unitmId;
                    //    }

                    //    var deletedet = entities.General_Memo_det.Where(d => d.Gen_memo_Masid == id).ToList<General_Memo_det>();

                    //    deletedet.ForEach(c => entities.General_Memo_det.Remove(c));
                    //    entities.SaveChanges();



                    //}



                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            item.Gen_memo_Masid = Masid;
                            entities.General_Memo_det.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GeneralMemo-AddDetData");
                }


                return reserved;
            }
        }


        public bool UpdateData(General_Memo_mas objUpd)
        {
            try
            {
                var result = false;
                var Upd = entities.General_Memo_mas.Where(c => c.Gen_memo_Masid == objUpd.Gen_memo_Masid).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.Gen_memo_Masid = objUpd.Gen_memo_Masid;
                    Upd.Gen_memo_No = objUpd.Gen_memo_No;
                    Upd.Gen_memo_date = objUpd.Gen_memo_date;
                    Upd.Gen_memo_Refdate = objUpd.Gen_memo_Refdate;
                    Upd.Gen_memo_RefNo = objUpd.Gen_memo_RefNo;
                    Upd.ReturnOrNo = objUpd.ReturnOrNo;
                    Upd.ReturnDate = objUpd.ReturnDate;
                    Upd.RequestnerId = objUpd.RequestnerId;
                    Upd.BuyerId = objUpd.BuyerId;
                    Upd.styleid = objUpd.styleid;
                    Upd.validatebomqtyindelivery = objUpd.validatebomqtyindelivery;
                    Upd.UnitId = objUpd.UnitId;
                    Upd.Unit_or_Other = objUpd.Unit_or_Other;
                    Upd.Company_unitID = objUpd.Company_unitID;
                    Upd.Companyid = objUpd.Companyid;
                    Upd.ProcessId = objUpd.ProcessId;
                    Upd.Order_no = objUpd.Order_no;
                    Upd.VehicleNo = objUpd.VehicleNo;
                    Upd.CreatedBy = objUpd.CreatedBy;




                    entities.SaveChanges();
                    result = true;
                }
                else { result = false; }

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IQueryable<GeneralMemoMas> GetDataMainList(int? cmpid, string entryno, int? unitid, int? masid, string refno, int? buyerid, string fromDate, string todate)
        {
            var query = (from YD in entities.Proc_GenMemoLoadMainGrid(cmpid, entryno, unitid, masid, refno, buyerid, fromDate, todate)
                         select new GeneralMemoMas
                         {
                             Companyid = YD.companyid,
                             company = YD.company,
                             Gen_memo_Masid = YD.gen_memo_masid,
                             Gen_memo_date = (DateTime)YD.gen_memo_date,
                             Gen_memo_No = YD.gen_memo_no,
                             Gen_memo_Refdate = (DateTime)YD.gen_memo_refdate,
                             Gen_memo_RefNo = YD.gen_memo_refno,
                             BuyerId = YD.Buyerid,
                             buyer = YD.Buyer,
                             UnitId = YD.unitid,
                             unit = YD.unit,
                             Remarks = (YD.Remarks==null?"":YD.Remarks),
                             RequestnerId = YD.RequestnerId,
                             ProcessId = YD.processid,
                             styleid = YD.Styleid,
                             VehicleNo = YD.VehicleNo,
                             bmasid = (int)(YD.Buy_Ord_MasId==null?0:YD.Buy_Ord_MasId),
                             Company_unitID = YD.FrmunitId,
                             Unit_or_Other = YD.unit_or_other,
                             ReturnOrNo=YD.ReturnOrNo,
                             ReturnDate=YD.ReturnDate


                         }).AsQueryable();

            return query;
        }


        public IQueryable<GeneralMemoDet> GeteditItemLoad(int masid)
        {
            var query = (from YD in entities.Proc_STRGen_Memo_Issue_det(masid)
                         select new GeneralMemoDet
                         {
                             Itemid = (int)YD.Itemid,
                             item = YD.Item,
                             Colorid = (int)YD.Colorid,
                             color = YD.color,
                             Sizeid = (int)YD.Sizeid,
                             size = YD.Size,
                             Quantity = (decimal)YD.Quantity,
                             Rate = (decimal)YD.Rate,
                             Amount = (decimal)YD.Amount,
                             Gen_memo_Detid = YD.Gen_memo_Detid,
                             Gen_memo_Masid = (int)YD.Gen_memo_Masid,

                             uom = YD.uom,
                             Uomid = (int)YD.Uomid,
                             ItemRemarks=YD.ItemRemarks

                         }).AsQueryable();

            return query;
        }


        public bool DeleteData(int id)
        {
            bool reserved = false;
         
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var deletedel = entities.General_Memo_det.Where(d => d.Gen_memo_Masid == id).ToList<General_Memo_det>();
                    deletedel.ForEach(c => entities.General_Memo_det.Remove(c));
                    entities.SaveChanges();

                    var deleteMas = entities.General_Memo_mas.Where(d => d.Gen_memo_Masid == id).ToList<General_Memo_mas>();
                    deleteMas.ForEach(c => entities.General_Memo_mas.Remove(c));
                    entities.SaveChanges();

                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GeneralMemo-DeleteData");
                }
            }

            return reserved;
        }


        public bool UpdDetData(General_Memo_mas objUpd, List<General_Memo_det> objdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Upd = entities.General_Memo_mas.Where(c => c.Gen_memo_Masid == objUpd.Gen_memo_Masid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Gen_memo_Masid = objUpd.Gen_memo_Masid;
                        Upd.Gen_memo_No = objUpd.Gen_memo_No;
                        Upd.Gen_memo_date = objUpd.Gen_memo_date;
                        Upd.Gen_memo_Refdate = objUpd.Gen_memo_Refdate;
                        Upd.Gen_memo_RefNo = objUpd.Gen_memo_RefNo;
                        Upd.ReturnOrNo = objUpd.ReturnOrNo;
                        Upd.ReturnDate = objUpd.ReturnDate;
                        Upd.RequestnerId = objUpd.RequestnerId;
                        Upd.BuyerId = objUpd.BuyerId;
                        Upd.styleid = objUpd.styleid;
                        Upd.validatebomqtyindelivery = objUpd.validatebomqtyindelivery;
                        Upd.UnitId = objUpd.UnitId;
                        Upd.Unit_or_Other = objUpd.Unit_or_Other;
                        Upd.Company_unitID = objUpd.Company_unitID;
                        Upd.Companyid = objUpd.Companyid;
                        Upd.ProcessId = objUpd.ProcessId;
                        Upd.Order_no = objUpd.Order_no;
                        Upd.VehicleNo = objUpd.VehicleNo;
                        Upd.CreatedBy = objUpd.CreatedBy;
                        Upd.Remarks = objUpd.Remarks;
                        entities.SaveChanges();

                    }




                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.Gen_memo_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.General_Memo_det.Where(d => d.Gen_memo_Masid == id).ToList<General_Memo_det>();

                    deletedet.ForEach(c => entities.General_Memo_det.Remove(c));
                    entities.SaveChanges();




                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            item.Gen_memo_Masid = objUpd.Gen_memo_Masid;
                            entities.General_Memo_det.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GeneralMemo-UpdDetData");
                }
            }

            return reserved;
        }
    }
}
