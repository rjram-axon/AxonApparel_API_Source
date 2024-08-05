using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class FabricReqRepository : IFabricReqRepository
    {
        ProcessEntities entities = new ProcessEntities();

        public IQueryable<Domain.FabricDet> LoadItemDet(int Bmasid, int Styleid)
        {
            var query = (from YD in entities.Proc_Apparel_FabricReqLoadItem(Bmasid, Styleid)
                         select new Domain.FabricDet
                         {
                             panelid = YD.panelid,
                             panel = YD.panel,
                             item = YD.fabric,
                             Itemid = YD.fabricid,
                             color = YD.color,
                             Colorid = YD.colorid,
                             size = YD.dia,
                             Sizeid = YD.sizeid,
                             AvailStock = (decimal)YD.stock,
                             LotNo = YD.lot,
                             BatchNo = YD.Batch,
                             FabricWt = 0,
                             combocolor = YD.Gcolor,
                             ComboColorid = YD.Gcolorid,
                             ReqWt = 0,
                             sno = (long)YD.Snumb,
                             Uomid = (int)YD.uomid,
                             uom = YD.Uom,
                             panelprdqty = (int)YD.PanelPrdQty,
                             freq = (decimal)YD.FReq,
                             bal = YD.BalQty,
                             check = "false",

                         }).AsQueryable();

            return query;
        }


        public bool Add(Fabric_Requisition_Mas obj, List<Fabric_Requisition_Det> objdet, string Mode)
        {
            bool reserved = false;
            int Masid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    entities.Fabric_Requisition_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.Fabric_Req_Masid;
                    foreach (var item in objdet)
                    {
                        item.Fabric_Req_Masid = Masid;
                        entities.Fabric_Requisition_Det.Add(item);
                        entities.SaveChanges();
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();

                }
            }
            return reserved;
        }


        public IQueryable<Domain.FabricMas> LoadMaingrid(int? bmasid, int? styleid, int? fabid, string processortype, string fromdate, string todate,string Otype, int ProcessorId)
        {

            var query = (from YD in entities.Proc_Apparel_FabricReqLoadMain(bmasid, styleid, fabid, ProcessorId, Otype,processortype, fromdate, todate)
                         select new Domain.FabricMas
                         {
                             orderno = YD.order_no,
                             refno = YD.ref_no,
                             style = YD.style,
                             Fabric_Req_date = (DateTime)YD.Fabric_Req_date,
                             Fabric_Req_no = YD.Fabric_Req_no,
                             Fabric_Req_Masid = YD.Fabric_Req_Masid,
                             IntenalOrExternal = YD.IntenalOrExternal,
                             Buy_Ord_Masid = (int)YD.Buy_Ord_MasId,
                             companyid = (int)YD.companyid,
                             styleid = YD.styleid,
                             ProcessorId = (int)YD.ProcessorId,
                             Processor = YD.processor
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.FabricDet> LoadEditItemDet(int Masid)
        {
            var query = (from YD in entities.Proc_Apparel_FabricReqEditItemLoad(Masid)
                         select new Domain.FabricDet
                         {
                             Buy_Ord_Masid = (int)YD.Buy_Ord_Masid,
                             Fabric_Req_date = (DateTime)YD.Fabric_Req_date,
                             Fabric_Req_no = YD.Fabric_Req_no,
                             IntenalOrExternal = YD.IntenalOrExternal,
                             panelid = YD.panelid,
                             panel = YD.panel,
                             item = YD.fabric,
                             Itemid = YD.fabricid,
                             color = YD.color,
                             Colorid = YD.colorid,
                             size = YD.dia,
                             Sizeid = YD.sizeid,
                             AvailStock = (decimal)YD.stock,
                             LotNo = YD.Lotno,
                             BatchNo = YD.BatchNo,
                             FabricWt = (decimal)YD.FabricWt,
                             combocolor = YD.Gcolor,
                             ComboColorid = YD.Gcolorid,
                             ReqWt = (decimal)YD.ReqWt,
                             sno = (long)YD.Snumb,
                             Uomid = (int)YD.uomid,
                             uom = YD.Uom,
                             ProcessorId = (int)YD.ProcessorId,
                             Companyid = (int)YD.companyid,
                             OType = YD.OType,
                             panelprdqty = (int)YD.PanelPrdQty,
                             freq = (decimal)YD.FReq,
                             bal = YD.BalQty,
                             PlannedQty = (decimal)YD.PlannedQty,
                             PendingQty = (decimal)YD.PendingQty,
                             check=YD.IsChecked,
                             styleid=YD.StyleId,
                         }).AsQueryable();

            return query;
        }


        public bool Update(Fabric_Requisition_Mas obj, List<Fabric_Requisition_Det> objdet, string Mode)
        {
            bool reserved = false;
            int Masid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //Delete

                    var deletedet = entities.Fabric_Requisition_Det.Where(d => d.Fabric_Req_Masid == obj.Fabric_Req_Masid).ToList<Fabric_Requisition_Det>();
                    deletedet.ForEach(c => entities.Fabric_Requisition_Det.Remove(c));
                    entities.SaveChanges();


                    var deletedetmas = entities.Fabric_Requisition_Mas.Where(d => d.Fabric_Req_Masid == obj.Fabric_Req_Masid).ToList<Fabric_Requisition_Mas>();
                    deletedetmas.ForEach(c => entities.Fabric_Requisition_Mas.Remove(c));
                    entities.SaveChanges();


                    //Add
                    entities.Fabric_Requisition_Mas.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.Fabric_Req_Masid;
                    foreach (var item in objdet)
                    {
                        if (item.IsChecked == "Y")
                        {
                            item.Fabric_Req_Masid = Masid;
                            entities.Fabric_Requisition_Det.Add(item);
                            entities.SaveChanges();
                        }
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();

                }
            }
            return reserved;
        }


        public bool Delete(Fabric_Requisition_Mas obj, List<Fabric_Requisition_Det> objdet, string Mode)
        {
            bool reserved = false;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //Delete
                    var deletedet = entities.Fabric_Requisition_Det.Where(d => d.Fabric_Req_Masid == obj.Fabric_Req_Masid).ToList<Fabric_Requisition_Det>();
                    deletedet.ForEach(c => entities.Fabric_Requisition_Det.Remove(c));
                    entities.SaveChanges();


                    var deletedetmas = entities.Fabric_Requisition_Mas.Where(d => d.Fabric_Req_Masid == obj.Fabric_Req_Masid).ToList<Fabric_Requisition_Mas>();
                    deletedetmas.ForEach(c => entities.Fabric_Requisition_Mas.Remove(c));
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();

                }
            }
            return reserved;
        }
    }
}
