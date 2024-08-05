using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class GeneralReceiptRepository : IGeneralReceiptRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public int AddData(Gen_MemoRet_mas objEntry)
        {
            var id = entities.Gen_MemoRet_mas.Add(objEntry);
            entities.SaveChanges();
            return (int)id.Gen_MemoRet_MasId;
        }

        public bool AddDetData(Gen_MemoRet_mas obj, List<Gen_MemoRet_det> objdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    entities.Gen_MemoRet_mas.Add(obj);
                    entities.SaveChanges();
                    Masid = (int)obj.Gen_MemoRet_MasId;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            item.Gen_memo_Masid = Masid;
                            entities.Gen_MemoRet_det.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "GeneralReceipt-AddDetData");
                }


                return reserved;
            }
        }


        public IQueryable<Domain.GeneralMemoRetDet> GetIssueno()
        {
            var query = (from YD in entities.GetIssueNo()
                         select new GeneralMemoRetDet
                         {

                             Gen_memo_Masid = YD.Gen_memo_Masid,
                             gen_memo_no = YD.Gen_memo_No

                         }).AsQueryable();

            return query;
        }

        public IQueryable<GeneralMemoRetDet> LoadItem(int masid)
        {
            var query = (from YD in entities.GetLoadItmDet(masid)
                         select new GeneralMemoRetDet
                         {

                             Gen_memo_Masid = (int)YD.Gen_memo_Masid,
                             Gen_memo_Detid = YD.Gen_memo_Detid,
                             Itemid = (int)YD.Itemid,
                             item = YD.Item,
                             Colorid = (int)YD.Colorid,
                             color = YD.Colorname,
                             Sizeid = (int)YD.Sizeid,
                             size = YD.size,
                             Uomid = (int)YD.Uomid,
                             uom = YD.Uom,
                             Quantity = YD.Quantity,
                             issuqty = (decimal)YD.issuqty,
                             //Closed=0

                         }).AsQueryable();

            return query;
        }


        public IQueryable<GeneralMemoRetMas> LoadMaingrid(string entryno, int? masid, int? cmpid, int? unitid, string fromdate, string todate)
        {
            var query = (from YD in entities.proc_GenRetMaingrid(entryno, masid, cmpid, unitid, fromdate, todate)
                         select new GeneralMemoRetMas
                         {

                             Gen_memo_Masid = (int)YD.gen_memo_masid,
                             Gen_MemoRet_MasId = YD.gen_memoret_masid,
                             CompanyId = YD.companyid,
                             company = YD.company,
                             UnitId = (int)YD.unitid,
                             unit = YD.unit,
                             Unit_or_Other = YD.unit_or_other,
                             GenMemo_RetNo = YD.genmemo_retno,
                             GenMemoRet_RefNo = YD.GenMemoRet_RefNo,
                             GenmemoRet_Refdate = (DateTime)YD.genmemoRet_refdate,
                             VehicleNo = YD.VehicleNo,
                             Remarks = YD.remarks,
                             MemoType = YD.memotype,
                             GenMemoRetDate = (DateTime)YD.genmemoRetdate

                         }).AsQueryable();

            return query;
        }


        public IQueryable<GeneralMemoRetMas> Loadheaderdet(int masid)
        {
            var query = (from YD in entities.Proc_Apparel_GeneralRetLoadHeader(masid)
                         select new GeneralMemoRetMas
                         {
                             CompanyId = YD.companyid,
                             buyerid = YD.buyerid,
                             Gen_MemoRet_MasId = YD.gen_memoret_masid,
                             Gen_memo_Masid = YD.gen_memo_masid,
                             GenMemo_RetNo = YD.genmemo_retno,
                             GenMemoRet_RefNo = YD.genmemoret_refno,
                             GenmemoRet_Refdate = (DateTime)YD.genmemoret_refdate,
                             GenMemoRetDate = (DateTime)YD.genmemoretdate,
                             Remarks = YD.remarks,
                             Unit_or_Other = YD.unit_or_other,
                             UnitId = (int)YD.unitid,
                             Company_unitID = YD.FrmunitID,
                             VehicleNo = YD.VehicleNo,
                             MemoType = YD.memotype


                         }).AsQueryable();

            return query;
        }


        public IQueryable<GeneralMemoRetDet> Loadedititmdet(int masid)
        {
            var query = (from YD in entities.Proc_Apparel_GeneralRetGeteditItm(masid)
                         select new GeneralMemoRetDet
                         {


                             Gen_memo_Detid = (int)YD.DetId,
                             Itemid = (int)YD.itemid,
                             item = YD.item,
                             Colorid = (int)YD.colorid,
                             color = YD.color,
                             Sizeid = (int)YD.sizeid,
                             size = YD.size,
                             Uomid = (int)YD.uomid,
                             uom = YD.uom,
                             Quantity = YD.quantity,
                             issuqty = (decimal)YD.iss,
                             Closed = (YD.closed == null ? "" : YD.closed),

                         }).AsQueryable();

            return query;
        }


        public bool UpdateData(Gen_MemoRet_mas objUpd)
        {
            try
            {
                var result = false;
                var Upd = entities.Gen_MemoRet_mas.Where(c => c.Gen_MemoRet_MasId == objUpd.Gen_MemoRet_MasId).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.Gen_memo_Masid = objUpd.Gen_memo_Masid;
                    Upd.UnitId = objUpd.UnitId;
                    Upd.Unit_or_Other = objUpd.Unit_or_Other;
                    Upd.Company_unitID = objUpd.Company_unitID;
                    Upd.VehicleNo = objUpd.VehicleNo;
                    Upd.CreatedBy = objUpd.CreatedBy;
                    Upd.buyerid = objUpd.buyerid;
                    Upd.CompanyId = objUpd.CompanyId;
                    Upd.GenMemo_RetNo = objUpd.GenMemo_RetNo;
                    Upd.Gen_MemoRet_MasId = objUpd.Gen_MemoRet_MasId;
                    Upd.GenmemoRet_Refdate = objUpd.GenmemoRet_Refdate;
                    Upd.GenMemoRet_RefNo = objUpd.GenMemoRet_RefNo;
                    Upd.GenMemoRetDate = objUpd.GenMemoRetDate;
                    Upd.Remarks = objUpd.Remarks;
                    Upd.MemoType = objUpd.MemoType;
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


        public bool DeleteData(int id)
        {
            bool reserved = false;            
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var deletedel = entities.Gen_MemoRet_det.Where(d => d.Gen_memo_Masid == id).ToList<Gen_MemoRet_det>();
                    deletedel.ForEach(c => entities.Gen_MemoRet_det.Remove(c));
                    entities.SaveChanges();

                    var deleteMas = entities.Gen_MemoRet_mas.Where(d => d.Gen_MemoRet_MasId == id).ToList<Gen_MemoRet_mas>();
                    deleteMas.ForEach(c => entities.Gen_MemoRet_mas.Remove(c));
                    entities.SaveChanges();

                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GeneralReceipt-DeleteData");

                }


                return reserved;
            }
        }


        public bool UpdDetData(Gen_MemoRet_mas objUpd, List<Gen_MemoRet_det> objdet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Upd = entities.Gen_MemoRet_mas.Where(c => c.Gen_MemoRet_MasId == objUpd.Gen_MemoRet_MasId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Gen_memo_Masid = objUpd.Gen_memo_Masid;
                        Upd.UnitId = objUpd.UnitId;
                        Upd.Unit_or_Other = objUpd.Unit_or_Other;
                        Upd.Company_unitID = objUpd.Company_unitID;
                        Upd.VehicleNo = objUpd.VehicleNo;
                        Upd.CreatedBy = objUpd.CreatedBy;
                        Upd.buyerid = objUpd.buyerid;
                        Upd.CompanyId = objUpd.CompanyId;
                        Upd.GenMemo_RetNo = objUpd.GenMemo_RetNo;
                        Upd.Gen_MemoRet_MasId = objUpd.Gen_MemoRet_MasId;
                        Upd.GenmemoRet_Refdate = objUpd.GenmemoRet_Refdate;
                        Upd.GenMemoRet_RefNo = objUpd.GenMemoRet_RefNo;
                        Upd.GenMemoRetDate = objUpd.GenMemoRetDate;
                        Upd.Remarks = objUpd.Remarks;
                        Upd.MemoType = objUpd.MemoType;
                        Upd.VehicleNo = objUpd.VehicleNo;
                        Upd.CreatedBy = objUpd.CreatedBy;


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

                    var deletedet = entities.Gen_MemoRet_det.Where(d => d.Gen_memo_Masid == id).ToList<Gen_MemoRet_det>();

                    deletedet.ForEach(c => entities.Gen_MemoRet_det.Remove(c));
                    entities.SaveChanges();

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            entities.Gen_MemoRet_det.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "GeneralReceipt-UpdDetData");
                }


                return reserved;
            }
        }
    }
}
