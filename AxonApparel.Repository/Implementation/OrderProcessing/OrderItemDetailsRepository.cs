using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class OrderItemDetailsRepository : IOrderItemDetailsRepository
    {
        OrderEntities entities = new OrderEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<BuyOrderStyle> GetDataRepList(int buyormasid)
        {
            IQueryable<BuyOrderStyle> query = (from cd in entities.Proc_Apparel_GetOrderItemDetailsMainLoad(buyormasid)
                                               select new BuyOrderStyle
                                               {
                                                   order_no = cd.ordeR_no,
                                                   styleName = cd.Style,
                                                   Styleid = cd.StyleId,
                                                   buyerItem = cd.item,
                                                   GItem_Id = (int)cd.itemid,
                                                   Buyerid = cd.BuyerId,
                                                   BuyerName = cd.Buyer,
                                                   StyleRowid = (int)cd.StyleRowId,
                                                   ItemCount = (int)cd.ItemCount,
                                                   GCount = (int)cd.GCount,
                                                   OrderItemCount = (int)cd.OrderItemCount

                                               }).AsQueryable();
            return query;
        }

        public IQueryable<Domain.Ord_styleTempMas> GetDllList()
        {
            var query = (from YD in entities.Ord_styleTempMas
                         select new Domain.Ord_styleTempMas
                         {
                             TemplateId = YD.TemplateId,
                             Template = YD.Template,
                             BuyerId = (int)YD.BuyerId,
                             GItemId = (int)YD.GItemId,
                         }).AsQueryable();
            return query;
        }

        public bool UpdateData(Domain.OrdCons_Mas objPoEntry, List<Domain.OrdCons_ProcSeq> objPoDet, List<Domain.OrdCons_YarnFab> objPoOrd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.OrdCons_Mas.Where(c => c.ordconsmasid == objPoEntry.ordconsmasid).FirstOrDefault();
                    if (App != null)
                    {
                        App.ordconsmasid = objPoEntry.ordconsmasid;
                        App.ordconsavggramage = objPoEntry.ordconsavggramage;
                        App.GarmentItemid = objPoEntry.GarmentItemid;
                        App.StyleRowId = objPoEntry.StyleRowId;
                    }
                    entities.SaveChanges();

                    //StyleTempDet Begin
                    var styletempdet = new List<Repository.OrdCons_ProcSeq>();

                    var yarnfabdet = new List<Repository.OrdCons_YarnFab>();

                    if (objPoDet.Count > 0)
                    {
                        foreach (var styledet in objPoDet)
                        {

                            var TermsCondQuery = entities.OrdCons_ProcSeq.Where(b => b.ordconsmasid == styledet.ordconsmasid).ToList();
                    if (TermsCondQuery != null)
                    {
                        var deletetermscondition = entities.OrdCons_ProcSeq.Where(d => d.ordconsmasid == styledet.ordconsmasid).ToList<OrdCons_ProcSeq>();
                        deletetermscondition.ForEach(c => entities.OrdCons_ProcSeq.Remove(c));
                        entities.SaveChanges();
                    }

                        }

                        foreach (var styledet in objPoDet)
                        {
                           
                            styletempdet.Add(new Repository.OrdCons_ProcSeq
                            {
                                ordconsmasid = App.ordconsmasid,
                                ordconsprocessmasid=styledet.ordconsprocessmasid,
                                ordconsprocessid = styledet.ordconsprocessid,
                                ordconsprocessloss = styledet.ordconsprocessloss,

                            });                                                     
                        }

                        foreach (var styledetails in styletempdet)
                        {
                            var det = entities.OrdCons_ProcSeq.Add(styledetails);
                            entities.SaveChanges();
                        }
                    }

                    if (objPoOrd.Count>0)
                    {

                    foreach (var styledet in objPoOrd)
                    {
                        var TermsCondQuery = entities.OrdCons_YarnFab.Where(b => b.ordconsmasid == styledet.ordconsmasid).ToList();
                        if (TermsCondQuery != null)
                        {
                            var deletetermscondition = entities.OrdCons_YarnFab.Where(d => d.ordconsmasid == styledet.ordconsmasid).ToList<OrdCons_YarnFab>();
                            deletetermscondition.ForEach(c => entities.OrdCons_YarnFab.Remove(c));
                            entities.SaveChanges();
                        }
                    }
                    foreach (var styledet in objPoOrd)
                    {
                            yarnfabdet.Add(new Repository.OrdCons_YarnFab
                            {

                                ordconsmasid = App.ordconsmasid,
                                ordconsyarnfabmasid = styledet.ordconsyarnfabmasid,
                                ordconsitemtype = styledet.ordconsitemtype,
                                ordconsitemid = styledet.ordconsitemid,

                            });
                            
                       
                    }

                    foreach (var styledetails in yarnfabdet)
                    {
                        var det = entities.OrdCons_YarnFab.Add(styledetails);
                        entities.SaveChanges();
                    }

                   }



                   // var result = AddStyleDetData(StyleTempDet, "Update");
                    //StyleTempDet End

                    //The Transaction will be completed
                    txscope.Complete();
                    //result = true;
                    return true;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OrderStyleTemplate-UpdateData");
                    return false;
                    throw ex;
                }
            }
        }
       
        public IQueryable<Domain.Ord_styleTempDet> GetStyleTemp(int id)
        {

            IQueryable<Domain.Ord_styleTempDet> query = (from T in entities.Proc_Apparel_GetStyleTemplate(id)
                                                         select new Domain.Ord_styleTempDet
                                                         {
                                                             DTempDetId = T.TempDetId,
                                                             DTemplateId = T.TemplateId,
                                                             DTemplate = T.Template,
                                                             DColorId = T.ColorId,
                                                             DColor = T.Color,
                                                             DSizeId = T.SizeId,
                                                             DQty = T.Qty,
                                                             DRate = T.Rate,
                                                             DBuyerId = (int)T.BuyerId,
                                                             DBuyerName = entities.Buyer.Where(e => e.BuyerId == T.BuyerId).Select(i => i.Buyer1).FirstOrDefault(),
                                                             DGItemId = (int)T.GItemId,
                                                             DGItem = entities.Item.Where(e => e.ItemId == T.GItemId).Select(i => i.Item1).FirstOrDefault(),
                                                             DGColorId = (int)(T.GColorid == null ? 0 : T.GColorid),
                                                             DSupplierId = (int)T.SupplierId,
                                                             DSupplierName = entities.Supplier.Where(e => e.SupplierId == T.SupplierId).Select(i => i.Supplier1).FirstOrDefault(),
                                                             DConvertTypeId = (int)T.ConvertTypeId,
                                                             DConvertTypeName = T.ConvertTypeName,
                                                             DGColor = (T.Gcolor == null ? string.Empty : T.Gcolor),
                                                             DGSizeId = (int)(T.GSizeid == null ? 0 : T.GSizeid),
                                                             DGSize = (T.GSize == null ? string.Empty : T.GSize),
                                                             DTypeval = T.Type,
                                                             DSize = entities.Size.Where(e => e.SizeId == T.SizeId).Select(i => i.size1).FirstOrDefault(),
                                                             DSno = 0,
                                                             DItemId = (int)T.ItemId,
                                                             DItem = entities.Item.Where(e => e.ItemId == T.ItemId).Select(i => i.Item1).FirstOrDefault(),
                                                         }).AsQueryable();
            return query;

        }
        public bool AddStyleDetData(List<Ord_styleTempDet> objCDet, string Mode)
        {
            try
            {
                int Templateid = 0;

                if (Mode == "Update")
                {
                    foreach (var item in objCDet)
                    {
                        Templateid = (int)item.TemplateId;

                    }

                    //delete StyleTempDet Many Rows table
                    var deletestyletemdet = entities.Ord_styleTempDet.Where(d => d.TemplateId == Templateid).ToList<Ord_styleTempDet>();
                    deletestyletemdet.ForEach(c => entities.Ord_styleTempDet.Remove(c));
                    entities.SaveChanges();
                }

                foreach (var item in objCDet)
                {
                    entities.Ord_styleTempDet.Add(item);
                }
                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IQueryable<Domain.Ord_styleTempDet> GetOrderStyleTemp(int id)
        {

            IQueryable<Domain.Ord_styleTempDet> query = (from T in entities.Proc_Apparel_Get_Ord_styleTemplate(id)
                                                         select new Domain.Ord_styleTempDet
                                                         {
                                                             DTempDetId = T.TempDetId,
                                                             DTemplateId = T.TemplateId,
                                                             DTemplate = T.Template,
                                                             DColorId = T.ColorId,
                                                             DColor = T.Color,
                                                             DSizeId = T.SizeId,
                                                             DQty = T.Qty,
                                                             DRate = T.Rate,
                                                             DBuyerId = (int)T.BuyerId,
                                                             DBuyerName = entities.Buyer.Where(e => e.BuyerId == T.BuyerId).Select(i => i.Buyer1).FirstOrDefault(),
                                                             DGItemId = (int)T.GItemId,
                                                             DGItem = entities.Item.Where(e => e.ItemId == T.GItemId).Select(i => i.Item1).FirstOrDefault(),
                                                             DGColorId = (int)(T.GColorid == null ? 0 : T.GColorid),
                                                             DSupplierId = (int)T.SupplierId,
                                                             DSupplierName = entities.Supplier.Where(e => e.SupplierId == T.SupplierId).Select(i => i.Supplier1).FirstOrDefault(),
                                                             DConvertTypeId = (int)T.ConvertTypeId,
                                                             DConvertTypeName = T.ConvertTypeName,
                                                             DGColor = (T.Gcolor == null ? string.Empty : T.Gcolor),
                                                             DGSizeId = (int)(T.GSizeid == null ? 0 : T.GSizeid),
                                                             DGSize = (T.GSize == null ? string.Empty : T.GSize),
                                                             DTypeval = T.Type,
                                                             DSize = entities.Size.Where(e => e.SizeId == T.SizeId).Select(i => i.size1).FirstOrDefault(),
                                                             DSno = 0,
                                                             DItemId = (int)T.ItemId,
                                                             DItem = entities.Item.Where(e => e.ItemId == T.ItemId).Select(i => i.Item1).FirstOrDefault(),
                                                         }).AsQueryable();
            return query;

        }


        public bool AddData(Domain.OrdCons_Mas objPoEntry, List<Domain.OrdCons_ProcSeq> objPoDet, List<Domain.OrdCons_YarnFab> objPoOrd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    Repository.OrdCons_Mas stytempmas = new Repository.OrdCons_Mas();
                    if (objPoEntry != null)
                    {

                        stytempmas.ordconsmasid = objPoEntry.ordconsmasid;
                        stytempmas.GarmentItemid = objPoEntry.GarmentItemid;
                        stytempmas.ordconsavggramage = objPoEntry.ordconsavggramage;
                        stytempmas.BmasId = objPoEntry.BmasId;
                        stytempmas.StyleRowId = objPoEntry.StyleRowId;
                    }

                    var sid = entities.OrdCons_Mas.Add(stytempmas);
                    entities.SaveChanges();

                    //StyleTempDet Start
                    var styletempdet = new List<Repository.OrdCons_ProcSeq>();

                    var yarnfabdet = new List<Repository.OrdCons_YarnFab>();

                    foreach (var styledet in objPoDet)
                    {
                        styletempdet.Add(new Repository.OrdCons_ProcSeq
                        {

                            ordconsmasid = sid.ordconsmasid,
                            ordconsprocessid = styledet.ordconsprocessid,
                            ordconsprocessloss = styledet.ordconsprocessloss,
                           
                        });
                    }

                    foreach (var styledetails in styletempdet)
                    {
                        var det = entities.OrdCons_ProcSeq.Add(styledetails);
                        entities.SaveChanges();
                    }

                    foreach (var styledet in objPoOrd)
                    {
                        yarnfabdet.Add(new Repository.OrdCons_YarnFab
                        {

                            ordconsmasid = sid.ordconsmasid,
                            ordconsitemtype = styledet.ordconsitemtype,
                            ordconsitemid = styledet.ordconsitemid,

                        });
                    }

                    foreach (var styledetails in yarnfabdet)
                    {
                        var det = entities.OrdCons_YarnFab.Add(styledetails);
                        entities.SaveChanges();
                    }

                    //StyleTempDet End

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;

                    //return id.StyleRowid;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OrderStyleTemplate-AddData");
                    return false;
                    throw ex;
                }
            }
        }



        public bool DeleteData(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var ordconsmasid = entities.OrdCons_Mas.Where(c => c.ordconsmasid == id).ToList();

                    foreach(var masid in ordconsmasid){
                    
                    
                    var processmasid = entities.OrdCons_ProcSeq.Where(c => c.ordconsmasid == masid.ordconsmasid).ToList();
                    if (processmasid != null)
                    {
                        //entities.StyleTempDet.Remove(cou);
                        processmasid.ForEach(c => entities.OrdCons_ProcSeq.Remove(c));
                    }
                    entities.SaveChanges();

                    var yarnmasid = entities.OrdCons_YarnFab.Where(c => c.ordconsmasid == masid.ordconsmasid).ToList();
                    if (yarnmasid != null)
                    {
                        //entities.StyleTempDet.Remove(cou);
                        yarnmasid.ForEach(c => entities.OrdCons_YarnFab.Remove(c));
                    }
                    entities.SaveChanges();
                    
                    }

                  
                    //Mas
                    var cou1 = entities.OrdCons_Mas.Where(c => c.ordconsmasid == id).FirstOrDefault();
                    if (cou1 != null)
                    {
                        entities.OrdCons_Mas.Remove(cou1);
                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "OrderStyleTemplate-DeleteData");
                }

            }
            return reserved;
        }
        public IQueryable<Domain.OrdCons_Mas> GetGarmentOrderNo(int BMasId)
        {
            IQueryable<Domain.OrdCons_Mas> query = (from cd in entities.Proc_Apparel_GetOrderItemEditMaindetails(BMasId)
                                             select new Domain.OrdCons_Mas
                                               {
                                                   ordconsmasid = cd.ordconsmasid,
                                                   ordconsavggramage = (decimal)cd.ordconsavg,
                                                    GarmentItemid= cd.GarmentItemid
                                                            
                                               }).AsQueryable();

            return query;

        }
        public IQueryable<Domain.OrdCons_ProcSeq> processdet(int conmasid)
        {
            IQueryable<Domain.OrdCons_ProcSeq> query = (from cd in entities.Proc_Apparel_GetOrderEditProcSeqDetails(conmasid)
                                                 select new Domain.OrdCons_ProcSeq
                                             {
                                                 ordconsmasid = cd.ordconsmasid,
                                                 ordconsprocessid = cd.ordconsprocessid,
                                                 ordconsprocessloss = cd.ordconsprocessloss,
                                                 ordconsprocessmasid = cd.ordconsprocessmasid,
                                                 Process=cd.Process
                                             }).AsQueryable();

            return query;

        }
        public IQueryable<Domain.OrdCons_YarnFab> yarnfabdet(int conmasid)
        {
            IQueryable<Domain.OrdCons_YarnFab> query = (from cd in entities.Proc_Apparel_GetOrderEditYarnFabDetails(conmasid)
                                                 select new Domain.OrdCons_YarnFab
                                             {
                                                 ordconsmasid = cd.ordconsmasid,
                                                 ordconsyarnfabmasid =cd.ordconsyarnfabmasid,
                                                 ordconsitemid = cd.ordconsitemid,
                                                 ordconsitemtype = cd.ordconsitemtype,
                                                 Item=cd.Item
                                             }).AsQueryable();

            return query;

        }

        public IQueryable<Domain.Ord_styleTempDet> GetDataRepCheckTempOrderDetails(int tempid, int tempdetid)
        {
            IQueryable<Domain.Ord_styleTempDet> query = (from a in entities.Proc_Apparel_Get_Ord_EditstyleTemplateValidate(tempid, tempdetid)
                                                         select new Domain.Ord_styleTempDet
                                                         {

                                                             CheckOrdTemp = (int)a.ChkPlanItem,
                                                             DItemId = (int)a.ItemId,


                                                         }).AsQueryable();

            return query;
        }
    }
}
