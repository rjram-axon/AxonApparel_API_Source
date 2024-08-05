using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class TestingDCBusiness : ITestingDCBusiness
    {
        private ITestingDCRepository strrep = new TestingDCRepository();

        public Response<IQueryable<AxonApparel.Domain.TestingDCMas>> GetTestingDC()
        {
            try
            {
                var strlist = strrep.GetDataList();

                return new Response<IQueryable<Domain.TestingDCMas>>(strlist.Select(m => new Domain.TestingDCMas
                {
                    TestingDCId = m.TestingDCId,
                    DCNo = m.DCNo,
                    DCDate = (DateTime)m.DCDate,
                    OrderId = (int)m.OrderId,
                    OrderNo = m.Buy_Ord_Mas.Order_No,
                    SupplierId = (int)m.SupplierId,
                    Supplier = m.Supplier.Supplier1,
                    BuyerId = (int)m.BuyerId,
                    Buyer = m.Buyer.Buyer1
                    
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.TestingDCMas>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<int> GetGatePassNoBuss()
        {
            try
            {
                var tst = strrep.GetGatePassNo();
                if (tst > 0) { tst = tst + 1; }
                else { tst = 1; }
                //return tst;
                return new Response<int>(tst, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<bool> CreateTestingDC(Domain.TestingDCMas tstDCobj)
        {
            try
            {
                AxonApparel.Repository.TestingDCMas TestingDCMasInsert = new AxonApparel.Repository.TestingDCMas
                {
                    DCNo = tstDCobj.DCNo,
                    DCDate = tstDCobj.DCDate,
                    CompanyId = tstDCobj.CompanyId,
                    SupplierId = tstDCobj.SupplierId,
                    TestOn = tstDCobj.TestOn,
                    HSNCODE = tstDCobj.HSNCODE,
                    TestValue = tstDCobj.TestValue,
                    BuyerId = tstDCobj.BuyerId,
                    ColorId = tstDCobj.ColorId,
                    CreatedBy = tstDCobj.CreatedBy,
                    OrderId = tstDCobj.OrderId,
                    VehicleNo = tstDCobj.VehicleNo,
                    GatePassNo = tstDCobj.GatePassNo,
                    //DebitOnSuppId = tstDCobj.DebitOnSuppID,
                    DebitOnUnitId = tstDCobj.DebitOnUnitID,
                    TaxId = tstDCobj.TaxID,
                    Remarks = tstDCobj.Remarks,
                    IsActive = true,
                };

                var testingDCDet = new List<Repository.TestingDCDet>();

                if (tstDCobj.Testing_dc_det != null)
                {
                    foreach (var SamTypelst in tstDCobj.Testing_dc_det)
                    {
                        testingDCDet.Add(new Repository.TestingDCDet
                        {
                            SeqNo = SamTypelst.SeqNo,
                            TestingTypeId = SamTypelst.TestingTypeId,
                            TestPcs = SamTypelst.TestPcs,
                            RatePerPcs = SamTypelst.RatePerPcs,
                            Value = SamTypelst.Value,
                            TaxAppVal = SamTypelst.TaxAppVal
                        });
                    }
                }

                Repository.GatePassNo objgatepass = new Repository.GatePassNo();

                objgatepass.GatePassId = tstDCobj.GatePassNo;
                objgatepass.Purpose = "TESTING";

                var result = strrep.AddData(TestingDCMasInsert, testingDCDet, objgatepass);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<AxonApparel.Domain.TestingDCMas> GetTestingDCId(int TestingDCId)
        {
            try
            {
                var str = strrep.GetDataById(TestingDCId);
                return new Response<Domain.TestingDCMas>(new Domain.TestingDCMas
                {
                    TestingDCId = str.TestingDCId,
                    DCNo = str.DCNo,
                    DCDate = (DateTime)str.DCDate,
                    CompanyId = (int)(str.CompanyId == null ? 0 : str.CompanyId),
                    SupplierId = (int)(str.SupplierId == null ? 0 : str.SupplierId),
                    Supplier = str.Supplier.Supplier1,
                    ColorId = (int)(str.ColorId == null ? 0 : str.ColorId),
                    TestOn = (int)(str.TestOn == null ? 0 : str.TestOn),
                    TestValue = (decimal)(str.TestValue == null ? 0 : str.TestValue),
                    BuyerId = (int)(str.BuyerId == null ? 0 : str.BuyerId),
                    OrderId = (int)(str.OrderId == null ? 0 : str.OrderId),
                    VehicleNo = str.VehicleNo,
                    HSNCODE = (str.HSNCODE == null ? Convert.ToString(0) : str.HSNCODE),
                    GatePassNo = (int)(str.GatePassNo == null ? 0 : str.GatePassNo),
                    DebitOnSuppID = (int)(str.DebitOnSuppId == null ? 0 : str.DebitOnSuppId),
                    DebitOnUnitID = (int)(str.DebitOnUnitId == null ? 0 : str.DebitOnUnitId),
                    TaxID = (int)(str.TaxId == null ? 0 : str.TaxId),
                    Remarks = str.Remarks,

                    Testing_dc_det = str.TestingDCDet.Select(h => new Domain.TestingDCDet()
                    {
                        TestingDCDetId = (int)h.TestingDetId,
                        TestingDCId = (int)h.TestingDCId,
                        SeqNo = h.SeqNo,
                        TestingType = h.TestingType.TestingType1,
                        TestingTypeId = (int)h.TestingTypeId,
                        TestPcs = (int)h.TestPcs,
                        RatePerPcs = (decimal)h.RatePerPcs,
                        Value = (decimal)h.Value,
                        TaxAppVal = (decimal)h.TaxAppVal,
                        StatusId = 0,
                    }).Where(x => x.TestingDCId == TestingDCId).ToList(),

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.TestingDCMas>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Response<bool> Delete(int id)
        {
            return new Response<bool>(strrep.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<bool> Update(Domain.TestingDCMas obj)
        {
            try
            {
                var ItmList = new List<Repository.TestingDCDet>();

                foreach (var PItem in obj.Testing_dc_det)
                {
                    ItmList.Add(new Repository.TestingDCDet
                    {
                        TestingDCId = PItem.TestingDCId,
                        SeqNo = PItem.SeqNo,
                        TestingTypeId = PItem.TestingTypeId,
                        TestPcs = PItem.TestPcs,
                        RatePerPcs = PItem.RatePerPcs,
                        Value = PItem.Value,
                        TaxAppVal = PItem.TaxAppVal
                    });
                }

                var TMID = strrep.UpdateData(new AxonApparel.Repository.TestingDCMas
                {
                    TestingDCId = obj.TestingDCId,
                    SupplierId = obj.SupplierId,
                    BuyerId = obj.BuyerId,
                    ColorId = obj.ColorId,
                    TestOn = (int)obj.TestOn,
                    TestValue = obj.TestValue,
                    OrderId = obj.OrderId,
                    HSNCODE = obj.HSNCODE,
                    VehicleNo = obj.VehicleNo,
                    //DebitOnSuppId = obj.DebitOnSuppID,
                    DebitOnUnitId = obj.DebitOnUnitID,
                    TaxId = obj.TaxID,
                    Remarks = obj.Remarks,
                    ModifyBy = obj.ModifyBy,
                    Modify_Date = DateTime.Now
                }, ItmList);

                if (TMID)
                {
                    //var result = stkRep.AddDetData(ItmList, yarnList, processList, bomList, cmtList, commList, "Update");
                    return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
                }
                else
                {
                    return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
                }
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
