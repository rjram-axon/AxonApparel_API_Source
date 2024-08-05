using AxonApparel.Common;

using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class StockLocAllocationBusiness : IStockLocAllocationBusiness
    {
        IStockLocAllocationRepository repo = new StockLocAllocationRepository();

        public Common.Response<IQueryable<Domain.StockLocAllocation>> GetStkStoreunit(int cmpid)
        {
            try
            {
                var ProductWO = repo.GetStoreunit(cmpid);

                return new Response<IQueryable<Domain.StockLocAllocation>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockLocAllocation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.StockLocAllocation>> Gettranstype()
        {
            try
            {
                var ProductWO = repo.Gettranstype();

                return new Response<IQueryable<Domain.StockLocAllocation>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockLocAllocation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.StockLocAllocation>> GetOrderno(int cmpid)
        {
            try
            {
                var ProductWO = repo.GetOrderno(cmpid);

                return new Response<IQueryable<Domain.StockLocAllocation>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockLocAllocation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.StockLocAllocation>> GetStyle(string orderno)
        {
            try
            {
                var ProductWO = repo.GetStyle(orderno);

                return new Response<IQueryable<Domain.StockLocAllocation>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockLocAllocation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.StockLocAllocation>> GetJobordno(string orderno)
        {
            try
            {
                var ProductWO = repo.GetJobordno(orderno);

                return new Response<IQueryable<Domain.StockLocAllocation>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockLocAllocation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.StockLocAllocation>> GetTransno(int compid, int strunitid)
        {
            try
            {
                var ProductWO = repo.GetTransno(compid, strunitid);

                return new Response<IQueryable<Domain.StockLocAllocation>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockLocAllocation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.StockLocAllocation>> LoadItem(int compid, int suppid, string ordno, string refno, int strunitid, string transtype, string transno, string jobordno, int styleid, int itmgrpid)
        {
            try
            {
                var ProductWO = repo.LoadItem(compid, suppid, ordno, refno, strunitid, transtype, transno, jobordno, styleid, itmgrpid);

                return new Response<IQueryable<Domain.StockLocAllocation>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockLocAllocation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateUnitEntry(Domain.StockAllocationMas Entry)
        {
            try
            {
                AxonApparel.Repository.StockAllocationMas Insobj = new AxonApparel.Repository.StockAllocationMas
                {
                    AllocationID = Entry.AllocationID,
                    AllocationNo = Entry.AllocationNo,
                    AllocationDate = Entry.AllocationDate,
                    AllocationRefNo = Entry.AllocationRefNo,
                    CompanyID = Entry.CompanyID,
                    SubStoreID = Entry.SubStoreID,
                    OrderType = Entry.OrderType,
                    StockType = Entry.StockType,
                    CreatedBy = Entry.CreatedBy
                };

                var ItmList = new List<StockAllocationDet>();

                foreach (var PItem in Entry.StkDet)
                {
                    ItmList.Add(new StockAllocationDet
                    {
                        AllocationId = PItem.AllocationId,
                        AllocationDetID = PItem.AllocationDetID,
                        StockID = PItem.StockID,
                        ItemId = PItem.ItemId,
                        ColorId = PItem.ColorId,
                        SizeId = PItem.SizeId,
                        Qty = PItem.Qty


                    });

                }

                var List = new List<StockAllocationSection>();

                if (Entry.StkSection != null)
                {
                    foreach (var li in Entry.StkSection)
                    {
                        List.Add(new StockAllocationSection
                        {
                            AllocationId = li.AllocationId,
                            AllocationDetID = li.AllocationDetID,
                            AllocationQty = li.AllocationQty,
                            SectionID = li.SectionID,
                            OldStockID = li.OldStockID,

                        });

                    }
                }

                var GenList = new List<Domain.StockLocAllocation>();
                foreach (var li in Entry.Gendet)
                {
                    if (li.allocqty > 0)
                    {
                        GenList.Add(new Domain.StockLocAllocation
                        {
                            itmid = li.itmid,
                            clrid = li.clrid,
                            sizeid = li.sizeid,
                            sno = li.sno,
                            jobordno = li.jobordno

                        });
                    }

                }

                var GenSecList = new List<Domain.StockAllocationSection>();
                foreach (var li in Entry.StkSection)
                {
                    GenSecList.Add(new Domain.StockAllocationSection
                    {
                        SecMasid = li.SecMasid,
                        sno = li.sno,
                        SectionID = li.SectionID,
                        AllocationQty = li.AllocationQty
                    });

                }

                var ItmStk = new List<ItemStock>();
                foreach (var li in Entry.Itmstkdet)
                {

                    ItmStk.Add(new ItemStock
                    {
                        UnitId = li.UnitId,
                        Itemid = li.Itemid,
                        Colorid = li.Colorid,
                        sizeid = li.sizeid,
                        qty = li.qty,
                        Rate = li.Rate,
                        joborderNo = li.joborderNo,
                        TransType = li.TransType,
                        Transno = li.Transno,
                        alloted = li.alloted,
                        ItemCat = li.ItemCat,
                        processId = li.processId,
                        sQty = li.sQty,
                        lotNo = "",//li.lotno,
                        balQty = li.balQty,
                        purorprod = li.purorprod,
                        transdate = li.transdate,
                        StockDate = li.transdate,
                        companyid = li.companyid,
                        supplierid = li.supplierid,
                        return_qty = li.return_qty,
                        uomid = li.uomid,
                        MfrId = li.MfrId,
                        Styleid = li.Styleid,
                        unit_or_other = li.unit_or_other,
                        ReProg = "",// li.reprog,
                        StockType = li.StockType,
                        Remarks = li.Remarks,
                        Markup_Rate = li.Markup_Rate,
                        ItemCode = "",//li.itmcode,
                        CatType = "",//li.cattype,
                        BundleNo = "",//li.bundleno,
                        OrderIdent = "",//li.orderindent,
                        FabricGSM = "",//li.fabgsm,
                        StoreUnitID = li.StoreUnitID,
                        SectionID = li.SectionID,
                        slno = Convert.ToString(li.snumb)

                    });


                }

                var result = repo.AddDetData(Insobj, ItmList, List, GenList, GenSecList, ItmStk, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }


        public Response<IQueryable<Domain.StockAllocationMas>> LoadMaingrid(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate, int AllocationID)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(cmpid, orderno, refno, strunitid, ordtype, stktype, jobordno, styleid, fromdate, todate, AllocationID);

                return new Response<IQueryable<Domain.StockAllocationMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockAllocationMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.StockAllocationMas>> GetEditHeaderDet(int masid)
        {
            try
            {
                var ProductWO = repo.GetEditHeaderDet(masid);

                return new Response<IQueryable<Domain.StockAllocationMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockAllocationMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.StockLocAllocation>> GetEditLoadItem(int masid, int compid, int strunitid)
        {
            try
            {
                var ProductWO = repo.GetEditLoadItem(masid, compid, strunitid);

                return new Response<IQueryable<Domain.StockLocAllocation>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockLocAllocation>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.StockAllocationSection>> GetEditSectionDet(int masid)
        {
            try
            {
                var ProductWO = repo.GetEditSectionDet(masid);

                return new Response<IQueryable<Domain.StockAllocationSection>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockAllocationSection>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateEntry(Domain.StockAllocationMas Entry)
        {
            try
            {
                AxonApparel.Repository.StockAllocationMas Insobj = new AxonApparel.Repository.StockAllocationMas
                {
                    AllocationID = Entry.AllocationID,
                    AllocationNo = Entry.AllocationNo,
                    AllocationDate = Entry.AllocationDate,
                    AllocationRefNo = Entry.AllocationRefNo,
                    CompanyID = Entry.CompanyID,
                    SubStoreID = Entry.SubStoreID,
                    OrderType = Entry.OrderType,
                    StockType = Entry.StockType,
                    CreatedBy = Entry.CreatedBy
                };

                var ItmList = new List<StockAllocationDet>();

                foreach (var PItem in Entry.StkDet)
                {
                    ItmList.Add(new StockAllocationDet
                    {
                        AllocationId = PItem.AllocationId,
                        AllocationDetID = PItem.AllocationDetID,
                        StockID = PItem.StockID,
                        ItemId = PItem.ItemId,
                        ColorId = PItem.ColorId,
                        SizeId = PItem.SizeId,
                        Qty = PItem.Qty


                    });

                }

                var List = new List<StockAllocationSection>();

                if (Entry.StkSection != null)
                {
                    foreach (var li in Entry.StkSection)
                    {
                        List.Add(new StockAllocationSection
                        {
                            AllocationId = li.AllocationId,
                            AllocationDetID = li.AllocationDetID,
                            AllocationQty = li.AllocationQty,
                            SectionID = li.SectionID,
                           // NewStockID = li.NewStockID,
                            StockAllocationSectionID = li.StockAllocationSectionID,
                            OldStockID = li.OldStockID,
                        });

                    }
                }

                var GenList = new List<Domain.StockLocAllocation>();
                foreach (var li in Entry.Gendet)
                {
                    if (li.allocqty > 0)
                    {
                        GenList.Add(new Domain.StockLocAllocation
                        {
                            itmid = li.itmid,
                            clrid = li.clrid,
                            sizeid = li.sizeid,
                            sno = li.sno,
                            jobordno = li.jobordno

                        });
                    }

                }

                var GenSecList = new List<Domain.StockAllocationSection>();
                foreach (var li in Entry.StkSection)
                {
                    GenSecList.Add(new Domain.StockAllocationSection
                    {
                        SecMasid = li.SecMasid,
                        sno = li.sno

                    });

                }

                var ItmStk1 = new List<Domain.ItmStkDet>();
                foreach (var li in Entry.Itmstkdet)
                {
                    ItmStk1.Add(new Domain.ItmStkDet
                         {
                             Mode = li.Mode
                         });
                }

                var ItmStk = new List<ItemStock>();
                foreach (var li in Entry.Itmstkdet)
                {

                    ItmStk.Add(new ItemStock
                    {
                        UnitId = li.UnitId,
                        Itemid = li.Itemid,
                        Colorid = li.Colorid,
                        sizeid = li.sizeid,
                        qty = li.qty,
                        Rate = li.Rate,
                        joborderNo = li.joborderNo,
                        TransType = li.TransType,
                        Transno = li.Transno,
                        alloted = li.alloted,
                        ItemCat = li.ItemCat,
                        processId = li.processId,
                        sQty = li.sQty,
                        lotNo = "",//li.lotno,
                        balQty = li.balQty,
                        purorprod = li.purorprod,
                        transdate = li.transdate,
                        StockDate = li.transdate,
                        companyid = li.companyid,
                        supplierid = li.supplierid,
                        return_qty = li.return_qty,
                        uomid = li.uomid,
                        MfrId = li.MfrId,
                        Styleid = li.Styleid,
                        unit_or_other = li.unit_or_other,
                        ReProg = "",// li.reprog,
                        StockType = li.StockType,
                        Remarks = li.Remarks,
                        Markup_Rate = li.Markup_Rate,
                        ItemCode = "",//li.itmcode,
                        CatType = "",//li.cattype,
                        BundleNo = "",//li.bundleno,
                        OrderIdent = "",//li.orderindent,
                        FabricGSM = "",//li.fabgsm,
                        StoreUnitID = li.StoreUnitID,
                        SectionID = li.SectionID,
                        StockId = li.StockId

                    });


                }

                var result = repo.UpdDetData(Insobj, ItmList, List, GenList, GenSecList, ItmStk, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }


        public Response<bool> DeleteEntry(Domain.StockAllocationMas Entry)
        {
            try
            {
                AxonApparel.Repository.StockAllocationMas Insobj = new AxonApparel.Repository.StockAllocationMas
                {
                    AllocationID = Entry.AllocationID,
                    AllocationNo = Entry.AllocationNo,
                    AllocationDate = Entry.AllocationDate,
                    AllocationRefNo = Entry.AllocationRefNo,
                    CompanyID = Entry.CompanyID,
                    SubStoreID = Entry.SubStoreID,
                    OrderType = Entry.OrderType,
                    StockType = Entry.StockType,
                    CreatedBy = Entry.CreatedBy
                };

                var ItmList = new List<StockAllocationDet>();

                foreach (var PItem in Entry.StkDet)
                {
                    ItmList.Add(new StockAllocationDet
                    {
                        AllocationId = PItem.AllocationId,
                        AllocationDetID = PItem.AllocationDetID,
                        StockID = PItem.StockID,
                        ItemId = PItem.ItemId,
                        ColorId = PItem.ColorId,
                        SizeId = PItem.SizeId,
                        Qty = PItem.Qty


                    });

                }

                var List = new List<StockAllocationSection>();

                if (Entry.StkSection != null)
                {
                    foreach (var li in Entry.StkSection)
                    {
                        List.Add(new StockAllocationSection
                        {
                            AllocationId = li.AllocationId,
                            AllocationDetID = li.AllocationDetID,
                            AllocationQty = li.AllocationQty,
                            SectionID = li.SectionID,
                            NewStockID = li.NewStockID,
                            StockAllocationSectionID = li.StockAllocationSectionID,
                            OldStockID = li.OldStockID,

                        });

                    }
                }

                var GenList = new List<Domain.StockLocAllocation>();
                foreach (var li in Entry.Gendet)
                {
                    if (li.allocqty > 0)
                    {
                        GenList.Add(new Domain.StockLocAllocation
                        {
                            itmid = li.itmid,
                            clrid = li.clrid,
                            sizeid = li.sizeid,
                            sno = li.sno,
                            jobordno = li.jobordno

                        });
                    }

                }

                var GenSecList = new List<Domain.StockAllocationSection>();
                foreach (var li in Entry.StkSection)
                {
                    GenSecList.Add(new Domain.StockAllocationSection
                    {
                        SecMasid = li.SecMasid,
                        sno = li.sno

                    });

                }

                var ItmStk1 = new List<Domain.ItmStkDet>();
                foreach (var li in Entry.Itmstkdet)
                {
                    ItmStk1.Add(new Domain.ItmStkDet
                    {
                        Mode = li.Mode
                    });
                }

                var ItmStk = new List<ItemStock>();
                foreach (var li in Entry.Itmstkdet)
                {

                    ItmStk.Add(new ItemStock
                    {
                        UnitId = li.UnitId,
                        Itemid = li.Itemid,
                        Colorid = li.Colorid,
                        sizeid = li.sizeid,
                        qty = li.qty,
                        Rate = li.Rate,
                        joborderNo = li.joborderNo,
                        TransType = li.TransType,
                        Transno = li.Transno,
                        alloted = li.alloted,
                        ItemCat = li.ItemCat,
                        processId = li.processId,
                        sQty = li.sQty,
                        lotNo = "",//li.lotno,
                        balQty = li.balQty,
                        purorprod = li.purorprod,
                        transdate = li.transdate,
                        StockDate = li.transdate,
                        companyid = li.companyid,
                        supplierid = li.supplierid,
                        return_qty = li.return_qty,
                        uomid = li.uomid,
                        MfrId = li.MfrId,
                        Styleid = li.Styleid,
                        unit_or_other = li.unit_or_other,
                        ReProg = "",// li.reprog,
                        StockType = li.StockType,
                        Remarks = li.Remarks,
                        Markup_Rate = li.Markup_Rate,
                        ItemCode = "",//li.itmcode,
                        CatType = "",//li.cattype,
                        BundleNo = "",//li.bundleno,
                        OrderIdent = "",//li.orderindent,
                        FabricGSM = "",//li.fabgsm,
                        StoreUnitID = li.StoreUnitID,
                        SectionID = li.SectionID,
                        StockId = li.StockId

                    });


                }

                var result = repo.DelDetData(Insobj, ItmList, List, GenList, GenSecList, ItmStk, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }



        public Response<IQueryable<Domain.StockAllocationSection>> GetDataGetAlloStore(int? substoreid, int? entryid)
        {
            try
            {
                var ProductWO = repo.GetAlloStoreRepDetails(substoreid, entryid);

                return new Response<IQueryable<Domain.StockAllocationSection>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockAllocationSection>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.StockAllocationMas>> LoadMaingriddrop(int cmpid, string orderno, string refno, int strunitid, string ordtype, string stktype, string jobordno, int styleid, string fromdate, string todate)
        {
            try
            {
                var ProductWO = repo.LoadMaingriddrop(cmpid, orderno, refno, strunitid, ordtype, stktype, jobordno, styleid, fromdate, todate);

                return new Response<IQueryable<Domain.StockAllocationMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockAllocationMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
