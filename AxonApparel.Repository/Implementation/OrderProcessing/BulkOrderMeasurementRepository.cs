using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BulkOrderMeasurementRepository : IBulkOrderMeasurementRepository
    {
        OrderEntities entities = new OrderEntities();

        public IQueryable<BulkOrderMeasurement> GetDataRepOrderDetails(int Id)
        {
            IQueryable<BulkOrderMeasurement> query = (from a in entities.Proc_Apparel_GetStyleMeasEntryLoad(Id)
                                                      select new BulkOrderMeasurement
                                              {
                                                  Buyer = a.buyer,
                                                  Buy_Ord_MasId = a.Buy_Ord_MasId,
                                                  Style = a.Style,
                                                  OrderNo = a.order_no,
                                                  OrderDate = (DateTime)a.Order_date,
                                                  inchORcms = "",
                                                  MeasureDate = (DateTime)a.MeasureDate,
                                                  MeasureMasId = a.MeasureMasId,
                                                  AMEND = "N",
                                                  RefNo = a.Ref_no,
                                                  Remarks = a.Remarks,
                                                  ChkIns = a.CheckIns,
                                              }).AsQueryable();

            return query;
        }
        public IQueryable<BuyOrdImg> GetOrderMeasuImg(int Id)
        {
            IQueryable<BuyOrdImg> query = (from a in entities.Ord_Mesurement_Img.Where(c => c.Sty_Row_Id == Id).ToList()
                                           select new BuyOrdImg
                                                      {
                                                          FilePath = a.Img_path,
                                                          FileID = a.ImgNo,
                                                          FileName = a.Img_Desc,
                                                          Imgtitle = a.Img_Title,
                                                      }).AsQueryable();

            return query;
        }

        public IList<BulkOrderMeasurementItemDet> GetRepMeasItemLoad(int Id, string OrdNo)
        {

            var query = (from ID in entities.Proc_Apparel_GetStyleMeasItemLoad(Id, OrdNo)
                         select new BulkOrderMeasurementItemDet
                         {
                             GarmentItem = ID.Item,
                             ITEMID = (int)ID.Itemid,
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<BulkOrderMeasurementItemDet> GetRepMeasSizeItemLoad(int Id, string OrdNo)
        {

            var query = (from ID in entities.Proc_Apparel_GetStyleMeasSizeLoad(Id, OrdNo)
                         select new BulkOrderMeasurementItemDet
                         {
                             CompItemId = ID.CompItemId,
                             ITEMID = (int)ID.ITEMID,
                             SizeId = (int)ID.Sizeid,
                             Size = ID.size,
                             Increment = (decimal)ID.Increment,
                             Tolerance = (decimal)ID.Tolerance,
                             Lookup = ID.LookUp,
                             MeasureName = ID.MeasureName,
                             MeasureDetid = ID.MeasureDetid,
                             MeasureMasId = ID.MeasureMasid,
                             Qty = 0,
                         }).AsQueryable();

            return query.ToList();
        }


        public bool AddDetData(Buy_Ord_MeasureMas objPoEntry, List<Buy_ord_MeasureDet> objPoDet, List<Buy_ord_MeasureSizedet> objPoOrd, List<Ord_Mesurement_Img> OrdMesurImg)
        {
            int MeaMasId = 0;
            int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (objPoEntry.MeasureMasId == 0)
                    {

                        entities.Buy_Ord_MeasureMas.Add(objPoEntry);
                        entities.SaveChanges();
                        MeaMasId = objPoEntry.MeasureMasId;
                        foreach (var item in objPoDet)
                        {
                            item.MeasureMasid = MeaMasId;
                            entities.Buy_ord_MeasureDet.Add(item);
                            entities.SaveChanges();
                            MeaDetId = item.MeasureDetid;

                            foreach (var itemOrder in objPoOrd)
                            {

                                if (itemOrder.Qty > 0)
                                {
                                    if (item.ITEMID == itemOrder.GItemId && item.CompItemId == itemOrder.CompId)
                                    {

                                        itemOrder.MeasureMasId = MeaMasId;
                                        itemOrder.MeasureDetid = MeaDetId;
                                        entities.Buy_ord_MeasureSizedet.Add(itemOrder);

                                    }

                                }

                            }

                        } 
                        var Imgdet = new List<Repository.Ord_Mesurement_Img>();
                        if (OrdMesurImg.Count > 0)
                        {
                            foreach (var img in OrdMesurImg)
                            {
                                Imgdet.Add(new Repository.Ord_Mesurement_Img
                                {
                                    Img_path = img.Img_path,
                                    Img_Title = img.Img_Title,
                                    Ord_No = img.Ord_No,
                                    Sty_Row_Id = img.Sty_Row_Id
                                });
                            }
                        }
                        foreach (var im in Imgdet)
                        {
                            entities.Ord_Mesurement_Img.Add(im);
                            
                        }
                        entities.SaveChanges();
                    }
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

        public bool UpdateDetData(Buy_Ord_MeasureMas objPoEntry, List<Buy_ord_MeasureDet> objPoDet, List<Buy_ord_MeasureSizedet> objPoOrd, List<Ord_Mesurement_Img> OrdMesurImg)
        {

            int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {


                    //SizeMeas
                    var CDet = entities.Buy_ord_MeasureSizedet.Where(u => u.MeasureMasId == objPoEntry.MeasureMasId);

                    foreach (var v in CDet)
                    {
                        entities.Buy_ord_MeasureSizedet.Remove(v);
                    }

                    //Det 
                    var Det = entities.Buy_ord_MeasureDet.Where(u => u.MeasureMasid == objPoEntry.MeasureMasId);

                    foreach (var d in Det)
                    {
                        entities.Buy_ord_MeasureDet.Remove(d);
                    }
                    entities.SaveChanges();



                    var App = entities.Buy_Ord_MeasureMas.Where(c => c.MeasureMasId == objPoEntry.MeasureMasId).FirstOrDefault();
                    if (App != null)
                    {
                        App.MeasureDate = objPoEntry.MeasureDate;
                        App.Remarks = objPoEntry.Remarks;
                        App.CheckIns = objPoEntry.CheckIns;
                    }
                    entities.SaveChanges();

                    if (objPoEntry.MeasureMasId > 0)
                    {

                        foreach (var item in objPoDet)
                        {
                            item.MeasureMasid = objPoEntry.MeasureMasId;
                            entities.Buy_ord_MeasureDet.Add(item);
                            entities.SaveChanges();
                            MeaDetId = item.MeasureDetid;

                            foreach (var itemOrder in objPoOrd)
                            {

                                if (itemOrder.Qty > 0)
                                {
                                    if (item.ITEMID == itemOrder.GItemId && item.CompItemId == itemOrder.CompId)
                                    {

                                        itemOrder.MeasureMasId = objPoEntry.MeasureMasId;
                                        itemOrder.MeasureDetid = MeaDetId;
                                        entities.Buy_ord_MeasureSizedet.Add(itemOrder);

                                    }

                                }

                            }

                        }


                    }
                    entities.SaveChanges();

                    var deletestyleimage = entities.Ord_Mesurement_Img.Where(d => d.Sty_Row_Id == objPoEntry.StyleRowid).ToList<Ord_Mesurement_Img>();
                    deletestyleimage.ForEach(c => entities.Ord_Mesurement_Img.Remove(c));
                    entities.SaveChanges();

                    foreach (var imagLis in OrdMesurImg)
                    {
                        entities.Ord_Mesurement_Img.Add(imagLis);
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

        public bool DeleteDetData(Buy_Ord_MeasureMas objPoEntry, List<Buy_ord_MeasureDet> objPoDet, List<Buy_ord_MeasureSizedet> objPoOrd)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //SizeMeas
                    var CDet = entities.Buy_ord_MeasureSizedet.Where(u => u.MeasureMasId == objPoEntry.MeasureMasId);

                    foreach (var v in CDet)
                    {
                        entities.Buy_ord_MeasureSizedet.Remove(v);
                    }

                    //Det 
                    var Det = entities.Buy_ord_MeasureDet.Where(u => u.MeasureMasid == objPoEntry.MeasureMasId);

                    foreach (var d in Det)
                    {
                        entities.Buy_ord_MeasureDet.Remove(d);
                    }
                    entities.SaveChanges();

                    //Mas
                    var Mas = entities.Buy_Ord_MeasureMas.Where(u => u.MeasureMasId == objPoEntry.MeasureMasId);

                    foreach (var v in Mas)
                    {
                        entities.Buy_Ord_MeasureMas.Remove(v);
                    }
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


        public IList<BulkOrderMeasurementItemDet> GetRepMeascompEditItemLoad(int Id)
        {
            var query = (from ID in entities.Proc_Apparel_GetStyleMeasEditCompLoad(Id)
                         select new BulkOrderMeasurementItemDet
                         {
                             CompItemId = ID.CompItemId,
                             ITEMID = (int)ID.ITEMID,
                             Increment = (decimal)ID.Increment,
                             Tolerance = (decimal)ID.Tolerance,
                             Lookup = ID.LookUp,
                             MeasureName = ID.MeasureName,
                             MeasureDetid = ID.MeasureDetid,
                             MeasureMasId = ID.MeasureMasid,
                             Qty = 0,
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<BulkOrderMeasurementItemDet> GetRepMeasEditSizeItemLoad(int Id)
        {
            var query = (from ID in entities.Proc_Apparel_GetStyleMeasEditSizeLoad(Id)
                         select new BulkOrderMeasurementItemDet
                         {
                             CompItemId = ID.CompItemId,
                             ITEMID = (int)ID.GItemId,
                             SizeId = (int)ID.Sizeid,
                             Size = ID.size,
                             MeasureDetid = ID.MeasureDetid,
                             MeasureMasId = ID.MeasureMasid,
                             Qty = ID.Qty,
                         }).AsQueryable();

            return query.ToList();
        }
    }
}
