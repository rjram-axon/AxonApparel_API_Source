using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class WorkOrderBusiness : IWorkOrderBusiness
    {
        private IWorkOrderRepository strrep = new WorkOrderRepository();


        //public Common.Response<IQueryable<Domain.WorkOrder>> GetWorkOrder()
        //{
        //    try
        //    {
        //        var strlist = strrep.GetDataList();
        //        return new Response<IQueryable<Domain.WorkOrder>>(strlist.Select(m => new Domain.WorkOrder
        //        {
        //           Stylerowid=m.StyleRowid,
        //           StyleId=m.Styleid,
        //           //Quantity=(int)m.Quantity,
        //           //Stylename= (m.StyleId==null?"0": m.Style.StyleName),
        //           //Price=(int)m.Price,
        //           ProductionQnty=(int)m.ProductionQty,
        //           ProcessunitId=(int)m.ProcessUnitID,
        //           Workorder=m.WORKORDER


        //        }), Status.SUCCESS, "Fetched Successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<IQueryable<Domain.WorkOrder>>(null, Status.ERROR, "OOPS error occured. Please try again later");
        //    }
        //}

        public Response<IQueryable<Domain.ProductionWorkOrder>> GetDataByWorkOrder(int Id)
        {
            try
            {
                var ProductWO = strrep.GetDataByOrder(Id);

                return new Response<IQueryable<Domain.ProductionWorkOrder>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProductionWorkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.ProductionShipWOEntry>> GetProdShipWO(int Id)
        {
            try
            {
                var ProductShipWO = strrep.GetProdShipWO(Id);
                
                return new Response<IList<Domain.ProductionShipWOEntry>>(ProductShipWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ProductionShipWOEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.ProductionItemWOEntry>> GetProdItemWO(int Id)
        {
            try
            {
                var ProductItemWO = strrep.GetProdItemWO(Id);

                return new Response<IList<Domain.ProductionItemWOEntry>>(ProductItemWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ProductionItemWOEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<Domain.WorkOrder> GetId(int Id)
        {
            throw new NotImplementedException();
        }

        public Response<bool> GetPlanningChecking(int StyleRowId)
        {
            return new Response<bool>(strrep.GetPlanningMasChecking(StyleRowId), Status.SUCCESS, "Fetched Successfully");
        }

        public Common.Response<int> CreateWorkOrder(Domain.ProductionWorkOrder WorkOrderAdd)
        {
            var StyleHeaderId = strrep.AddData(new Domain.ProductionWorkOrder
            {
                OrderNo = WorkOrderAdd.OrderNo,
                Orderdate = WorkOrderAdd.Orderdate,
                StyleId = WorkOrderAdd.StyleId,
                BuyerId = WorkOrderAdd.BuyerId,
                Quantity = WorkOrderAdd.Quantity,
                ProductionQty = WorkOrderAdd.ProductionQty,
                AllowancePer = WorkOrderAdd.AllowancePer,
                EmployeeID = WorkOrderAdd.EmployeeID,
                Remarks = WorkOrderAdd.Remarks,
                ProcessUnitId = WorkOrderAdd.ProcessUnitId,
                Stylerowid = WorkOrderAdd.Stylerowid,
                WorkOrder = WorkOrderAdd.WorkOrder,
                CompanyId = WorkOrderAdd.CompanyId,
                ProdUnitId=WorkOrderAdd.ProdUnitId,
                lstprodShipwo = WorkOrderAdd.lstprodShipwo,
                lstprodItemwo = WorkOrderAdd.lstprodItemwo
            });

            ////Insert into Job_Ord_Det
            //var shipList = new List<Domain.ProductionShipWOEntry>();

            //if (WorkOrderAdd.lstprodShipwo.Count > 0)
            //{
            //    foreach (var item in WorkOrderAdd.lstprodShipwo)
            //    {
            //        shipList.Add(new Domain.ProductionShipWOEntry
            //        {
            //            JobOrderNo = WorkOrderAdd.WorkOrder,
            //            BuyOrdShip = item.BuyOrdShip,
            //            DeliveryDate = Convert.ToDateTime("2011-07-01"),//Convert.ToDateTime(item.DeliveryDate),
            //            Qty = item.Qty
            //        });
            //    }
            //}

            //var shipresult = strrep.AddShipWoData(shipList, "Add");

            ////Insert into Buy_Ord_Det
            //var itemList = new List<Domain.ProductionItemWOEntry>();

            //if (WorkOrderAdd.lstprodItemwo.Count > 0)
            //{
            //    foreach (var item in WorkOrderAdd.lstprodItemwo)
            //    {
            //        itemList.Add(new Domain.ProductionItemWOEntry
            //        {
            //            BuyOrdShip = item.BuyOrdShip,
            //            StyleRowId = WorkOrderAdd.Stylerowid, 
            //            OrdNo=WorkOrderAdd.OrderNo,
            //            Colorid = item.Colorid,
            //            SizeId = item.SizeId,
            //            OrderNo = WorkOrderAdd.WorkOrder,
            //            Allowance=item.Allowance,
            //            ShipRow = item.ShipRow,
            //            ProdQty=item.ProdQty,
            //            OrderQty=item.OrderQty,
            //            ItemId=item.ItemId,                        
            //        });
            //    }
            //}

            //var itemresult = strrep.AddItemWoData(itemList, "Add");


            ////Insert into Job_Ord_Color
            //var colorList = new List<Domain.ProductionColorWOEntry>();

            //if (WorkOrderAdd.lstprodItemwo.Count > 0)
            //{
            //    foreach (var item in WorkOrderAdd.lstprodItemwo)
            //    {
            //        colorList.Add(new Domain.ProductionColorWOEntry
            //        {
            //            JobOrderNo = WorkOrderAdd.WorkOrder,
            //            Buy_Ord_Ship = item.BuyOrdShip,
            //            Colorid = item.Colorid,
            //            SizeId = item.SizeId,
            //            ItemId = item.ItemId,
            //            OrderQty = (decimal)item.OrderQty,
            //            Rate = 0,
            //            SizerowId = item.SizeRow,
            //            //JobOrderNo = item.OrderNo,                        
            //        });
            //    }
            //}

            //var resultitemcolor = strrep.AddColorWoData(colorList, "Add");

            ////Insert into Program_Summary
            //var programsummaryList = new List<Domain.ProgramSummary>();
            
            //if (WorkOrderAdd.lstprodItemwo.Count > 0)
            //{
            //    foreach (var item in WorkOrderAdd.lstprodItemwo)
            //    {
            //        programsummaryList.Add(new Domain.ProgramSummary
            //        {
            //            OrderNo = WorkOrderAdd.WorkOrder,
            //            Type = "GN",
            //            BuyJobWork="W",
            //            Colorid = item.Colorid,
            //            Sizeid = item.SizeId,
            //            Itemid = item.ItemId,
            //            Styleid=WorkOrderAdd.StyleId,
            //            Qty = (int)item.OrderQty,
            //        });
            //    }
            //}

            //var resultprgsumm = strrep.AddProgramSummary(programsummaryList, "Add");


            return new Response<int>(StyleHeaderId, Status.SUCCESS, "Saved Successfully");
        }

        public Common.Response<bool> UpdateWorkOrder(Domain.ProductionWorkOrder WorkOrderUpd)
        {
            //if (string.IsNullOrEmpty(WorkOrderUpd.Workorder))
            //    return new Response<bool>(false, Status.ERROR, "Given Workorder is empty");
            //if (isNameAvailableAlready(WorkOrderUpd, "UPDATE"))
            //    return new Response<bool>(false, Status.ERROR, "Given Workorder is already available");

            return new Response<bool>(strrep.UpdateData(new Domain.ProductionWorkOrder
            {
                StyleId = WorkOrderUpd.StyleId,
                Stylerowid = WorkOrderUpd.Stylerowid,
                AllowancePer=WorkOrderUpd.AllowancePer,                
                ProductionQty = WorkOrderUpd.ProductionQty,                
                WorkOrder = WorkOrderUpd.WorkOrder,
                ProdUnitId=WorkOrderUpd.ProdUnitId,
                lstprodShipwo = WorkOrderUpd.lstprodShipwo,
                lstprodItemwo = WorkOrderUpd.lstprodItemwo
            }), Status.SUCCESS, "Updated Successfully");
            //return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
        }

        //public Common.Response<bool> UpdateWorkOrder(Domain.WorkOrder WorkOrderUpd)
        //{
        //    if (string.IsNullOrEmpty(WorkOrderUpd.Workorder))
        //        return new Response<bool>(false, Status.ERROR, "Given Workorder is empty");
        //    if (isNameAvailableAlready(WorkOrderUpd, "UPDATE"))
        //        return new Response<bool>(false, Status.ERROR, "Given Workorder is already available");

        //    return new Response<bool>(strrep.UpdateData(new Repository.buy_ord_style
        //    {
        //        Styleid=WorkOrderUpd.StyleId,
        //        StyleRowid=WorkOrderUpd.Stylerowid,
        //        //Quantity=WorkOrderUpd.Quantity,
        //        //  style = WorkOrderUpd.IsActive.ToUpper() == "TRUE",
        //        //Price=WorkOrderUpd.Price,
        //        ProductionQty=WorkOrderUpd.ProductionQnty,
        //        //Value=WorkOrderUpd.Value,
        //        WORKORDER=WorkOrderUpd.Workorder
        //        }), Status.SUCCESS, "Updated Successfully");
        //}

        public Response<bool> DeleteWorkOrder(int Id)
        {
            return new Response<bool>(strrep.DeleteData(Id), Status.SUCCESS, "Deleted Successfully");
        }

        //private bool isNameAvailableAlready(Domain.WorkOrder st, string mode)
        //{
        //    if (mode.ToUpper() == "ADD")
        //    {
        //        return (GetWorkOrder().Value.Where(c => c.Workorder.ToUpper() == st.Workorder.ToUpper()).ToList().Count > 0);
        //    }
        //    else if (mode.ToUpper() == "UPDATE")
        //    {
        //        return (GetWorkOrder().Value.Where(c => c.Workorder.ToUpper() == st.Workorder.ToUpper() && c.Stylerowid != st.Stylerowid).ToList().Count > 0);
        //    }
        //    return false;

        //}


       

        public Response<IQueryable<Domain.ProductionWorkOrder>> GetWorkOrderNoList()
        {
            try
            {
                var OrdList = strrep.GetDataList();
                return new Response<IQueryable<Domain.ProductionWorkOrder>>(OrdList.Select(m => new Domain.ProductionWorkOrder
                {
                    JobNoId = m.ID,
                    WorkOrder = m.Job_Ord_No
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProductionWorkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }   

    }
}
