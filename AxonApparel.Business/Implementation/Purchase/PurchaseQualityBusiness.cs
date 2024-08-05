using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class PurchaseQualityBusiness : IPurchaseQualityBusiness
    {

        IPurchaseQualityRepository ObjRepQl = new PurchaseQualityRepository();

        public Response<IQueryable<PurchaseGrnMas>> GetDataQltyDetails(int Id)
        {
            try
            {
                var ProductWO = ObjRepQl.GetDataQualityRepDetails(Id);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurQltyDet>> GetQltyEntryItemDetails(int GrnId)
        {
            try
            {
                var ProductWO = ObjRepQl.GetDataQltyRepItemDetails(GrnId);

                return new Response<IList<PurQltyDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PurQltyDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurQltyOrder>> GetQltyEntryOrderDetails(int GrnDetId)
        {
            try
            {
                var ProductWO = ObjRepQl.GetDataQltyRepOrderDetails(GrnDetId);

                return new Response<IList<PurQltyOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PurQltyOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurQltyOrder>> GetQltyEntryOrderSaveDetails(int GrnId)
        {
            try
            {
                var ProductWO = ObjRepQl.GetDataQltyRepOrderSaveDetails(GrnId);

                return new Response<IList<PurQltyOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PurQltyOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateQltyEntry(PurchaseGrnMas QEntry)
        {
            int? PurBuyJobId = 0;
            try
            {

                        


                AxonApparel.Repository.Pur_Grn_Mas purgrnQcInsert = new AxonApparel.Repository.Pur_Grn_Mas
                {
                    Grn_MasId = QEntry.Grn_MasId,
                    Qlty_date = QEntry.Qlty_date,
                    QCReport_No = QEntry.QCReport_No,
                    Qlty_No = QEntry.Qlty_No,
                    QltyRemarks = QEntry.QltyRemarks,

                };

                //update purgrndet 

                var EItmList = new List<Pur_Grn_Det>();

                foreach (var PItem in QEntry.PurQDet)
                {


                    if (PItem.grnqty > 0)
                    {

                        EItmList.Add(new Pur_Grn_Det
                        {

                            Grn_DetId = PItem.Grn_detid,
                            rejected_qty = PItem.grnreject,
                            shortage_qty = PItem.grnshortage,
                            accepted_qty = PItem.grnaccept,
                            Excess_return = PItem.excess_return,
                            debit_qty = PItem.Debit,
                            return_qty = PItem.grnreturn,
                            receivable_qty = PItem.grnreceivable,
                            Qlty_Excess = PItem.qltyexcess,
                            QltyItemRemarks = PItem.QltyItemRemarks,
                            excess_qty=PItem.Eexcess_qty,
                            itemid = PItem.Itemid,
                            colorid = PItem.Colorid,
                            sizeid = PItem.Sizeid,
                            uomId = PItem.Uomid,
                        });
                    }
                }


                var ItmList = new List<pur_grn_qlty_det>();

                foreach (var POItem in QEntry.PurQOrdDet)
                {
                    if (POItem.pur_ord_buyjobid == 0)
                    {
                        PurBuyJobId = null;
                    }
                    else
                    {
                        PurBuyJobId = POItem.pur_ord_buyjobid;
                    }

                    if (POItem.accept_qty > 0 || POItem.debit_qty >0)
                    {

                        ItmList.Add(new pur_grn_qlty_det
                        {

                            grn_detid = POItem.grn_detid,
                            pur_ord_detid = POItem.pur_ord_detid,
                            pur_ord_buyjobid = PurBuyJobId,//POItem.pur_ord_buyjobid,
                            accept_qty = POItem.accept_qty,
                            debit_qty = POItem.debit_qty,
                            receivable_qty = POItem.receivable_qty,
                            Excess_Qty = POItem.QltyExcessQty,
                            Returnqty = POItem.ExReturnqty,
                            ItemID = POItem.ItemId,
                            ColorID = POItem.ColorId,
                            SizeID = POItem.SizeId,
                            UOMId = POItem.UomId,
                        });
                    }
                }


                var result = ObjRepQl.AddDetData(ItmList, QEntry.Qlty_date, purgrnQcInsert, EItmList, QEntry.PurIndType);



                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PurchaseGrnMas>> GetDataQltyEditDetails(int Id)
        {
            try
            {
                var ProductWO = ObjRepQl.GetDataQualityRepEditDetails(Id);

                return new Response<IQueryable<PurchaseGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PurchaseGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurQltyDet>> GetQltyEntryEditItemDetails(int GrnId)
        {
            try
            {
                var ProductEWO = ObjRepQl.GetDataQltyRepEditItemDetails(GrnId);

                return new Response<IList<PurQltyDet>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PurQltyDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurQltyOrder>> GetQltyEntryOrderEditDetails(int GrnDetId)
        {
            try
            {
                var ProductWO = ObjRepQl.GetDataQltyRepOrderEditDetails(GrnDetId);

                return new Response<IList<PurQltyOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PurQltyOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurQltyOrder>> GetQltyEntryEditOrderSaveDetails(int GrnId)
        {
            try
            {
                var ProductWO = ObjRepQl.GetDataQltyRepEditOrderSaveDetails(GrnId);

                return new Response<IList<PurQltyOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PurQltyOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateQltyEntry(PurchaseGrnMas QEditEntry)
        {
            try
            {

                   


                AxonApparel.Repository.Pur_Grn_Mas purgrnAcEInsert = new AxonApparel.Repository.Pur_Grn_Mas
                {
                    Grn_MasId = QEditEntry.Grn_MasId,
                    Qlty_date = QEditEntry.Qlty_date,
                    QCReport_No = QEditEntry.QCReport_No,
                    Qlty_No = QEditEntry.Qlty_No,
                    QltyRemarks = QEditEntry.QltyRemarks,

                };

                //update purgrndet 

                var EItmList = new List<Pur_Grn_Det>();

                foreach (var PItem in QEditEntry.PurQDet)
                {


                    if (PItem.grnqty > 0)
                    {

                        EItmList.Add(new Pur_Grn_Det
                        {

                            Grn_DetId = PItem.Grn_detid,
                            rejected_qty = PItem.grnreject,
                            shortage_qty = PItem.grnshortage,
                            accepted_qty = PItem.grnaccept,
                            Excess_return = PItem.excess_return,
                            debit_qty = PItem.Debit,
                            excess_qty = PItem.Eexcess_qty,
                            return_qty = PItem.grnreturn,
                            receivable_qty = PItem.grnreceivable,
                            Qlty_Excess = PItem.qltyexcess,
                            QltyItemRemarks = PItem.QltyItemRemarks,
                            itemid = PItem.Itemid,
                            colorid = PItem.Colorid,
                            sizeid = PItem.Sizeid,
                            uomId = PItem.Uomid,
                        });
                    }
                }
         


                var ItmList = new List<pur_grn_qlty_det>();

                foreach (var POItem in QEditEntry.PurQOrdDet)
                {


                    if (POItem.accept_qty > 0)
                    {

                        ItmList.Add(new pur_grn_qlty_det
                        {

                            grn_detid = POItem.grn_detid,
                            pur_ord_detid = POItem.pur_ord_detid,
                            pur_ord_buyjobid = POItem.pur_ord_buyjobid,
                            accept_qty = POItem.accept_qty,
                            debit_qty = POItem.debit_qty,
                            receivable_qty = POItem.receivable_qty,
                            Excess_Qty = POItem.QltyExcessQty,
                            Returnqty = POItem.ExReturnqty,



                            ItemID = POItem.ItemId,
                            ColorID = POItem.ColorId,
                            SizeID = POItem.SizeId,
                            UOMId = POItem.UomId,
                        });
                    }
                }
                var result2 = ObjRepQl.UpdateDetData(EItmList, ItmList, QEditEntry.Qlty_date, QEditEntry.receipt_no, QEditEntry.PurIndType);


                //Edit add
                var ETItmList = new List<Pur_Grn_Det>();

                foreach (var PItem in QEditEntry.PurQDet)
                {


                    if (PItem.grnqty > 0)
                    {

                        ETItmList.Add(new Pur_Grn_Det
                        {

                            Grn_DetId = PItem.Grn_detid,
                            rejected_qty = PItem.grnreject,
                            shortage_qty = PItem.grnshortage,
                            accepted_qty = PItem.grnaccept,
                            Excess_return = PItem.excess_return,
                            debit_qty = PItem.Debit,
                            return_qty = PItem.grnreturn,
                            receivable_qty = PItem.grnreceivable,
                            Qlty_Excess = PItem.qltyexcess,
                            QltyItemRemarks = PItem.QltyItemRemarks,
                            excess_qty = PItem.Eexcess_qty,
                            itemid = PItem.Itemid,
                            colorid = PItem.Colorid,
                            sizeid = PItem.Sizeid,
                            uomId = PItem.Uomid,
                        });
                    }
                }



                var QItmList = new List<pur_grn_qlty_det>();

                foreach (var POItem in QEditEntry.PurQOrdDet)
                {
                    int? buyjobid = null;

                    if (QEditEntry.pur_type == "G")
                    {
                        buyjobid = null;

                    }
                    else
                    {
                        buyjobid = POItem.pur_ord_buyjobid;
                    }

                    if (POItem.accept_qty > 0)
                    {

                        QItmList.Add(new pur_grn_qlty_det
                        {

                            grn_detid = POItem.grn_detid,
                            pur_ord_detid = POItem.pur_ord_detid,
                            pur_ord_buyjobid = buyjobid,
                            accept_qty = POItem.accept_qty,
                            debit_qty = POItem.debit_qty,
                            receivable_qty = POItem.receivable_qty,
                            Excess_Qty = POItem.POExcess_Qty,
                            Returnqty = POItem.ExReturnqty,
                            ItemID = POItem.ItemId,
                            ColorID = POItem.ColorId,
                            SizeID = POItem.SizeId,
                            UOMId = POItem.UomId,
                        });
                    }
                }


                if (result2 == true)
                {

                    var result = ObjRepQl.AddDetData(QItmList, QEditEntry.Qlty_date, purgrnAcEInsert, ETItmList, QEditEntry.PurIndType);
                    return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                }
                else {
                    return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
                }

                
               

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteQltyEntry(PurchaseGrnMas QDelEntry)
        {
            try
            {

  
                AxonApparel.Repository.Pur_Grn_Mas purgrnAcEInsert = new AxonApparel.Repository.Pur_Grn_Mas
                {
                    Grn_MasId = QDelEntry.Grn_MasId,
                    Qlty_date = QDelEntry.Qlty_date,
                    QCReport_No = QDelEntry.QCReport_No,
                    Qlty_No = QDelEntry.Qlty_No,
                    QltyRemarks = QDelEntry.QltyRemarks,

                };

                //update purgrndet 

                var EItmList = new List<Pur_Grn_Det>();

                foreach (var PItem in QDelEntry.PurQDet)
                {


                    if (PItem.grnqty > 0)
                    {

                        EItmList.Add(new Pur_Grn_Det
                        {

                            Grn_DetId = PItem.Grn_detid,
                            rejected_qty = PItem.grnreject,
                            shortage_qty = PItem.grnshortage,
                            accepted_qty = PItem.grnaccept,
                            Excess_return = PItem.excess_return,
                            excess_qty = PItem.Eexcess_qty,
                            debit_qty = PItem.Debit,
                            return_qty = PItem.grnreturn,
                            receivable_qty = PItem.grnreceivable,
                            Qlty_Excess = PItem.qltyexcess,
                            QltyItemRemarks = PItem.QltyItemRemarks,
                            itemid = PItem.Itemid,
                            colorid = PItem.Colorid,
                            sizeid = PItem.Sizeid,
                            uomId = PItem.Uomid,
                        });
                    }
                }
             


                var ItmList = new List<pur_grn_qlty_det>();

                foreach (var POItem in QDelEntry.PurQOrdDet)
                {


                    if (POItem.accept_qty > 0)
                    {

                        ItmList.Add(new pur_grn_qlty_det
                        {

                            grn_detid = POItem.grn_detid,
                            pur_ord_detid = POItem.pur_ord_detid,
                            pur_ord_buyjobid = POItem.pur_ord_buyjobid,
                            accept_qty = POItem.accept_qty,
                            debit_qty = POItem.debit_qty,
                            receivable_qty = POItem.receivable_qty,
                            Excess_Qty = POItem.POExcess_Qty,
                            Returnqty = POItem.ExReturnqty,
                            ItemID = POItem.ItemId,
                            ColorID = POItem.ColorId,
                            SizeID = POItem.SizeId,
                            UOMId = POItem.UomId,
                        });
                    }
                }
                var result = ObjRepQl.DeleteDetData(purgrnAcEInsert, EItmList, ItmList, QDelEntry.Qlty_date, QDelEntry.receipt_no, QDelEntry.PurIndType);
                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PurQltyDet>> GetQltyEntryCheckEditItemDetails(string TransNo)
        {
            try
            {
                var ProductEWO = ObjRepQl.GetDataQltyRepEditCheckItemDetails(TransNo);

                return new Response<IList<PurQltyDet>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PurQltyDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
