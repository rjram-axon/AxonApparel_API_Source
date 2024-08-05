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
    public class SizeBusiness:ISizeBusiness
    {
        private ISizeRepository strrep = new SizeRepository();

        public Response<IEnumerable<AxonApparel.Domain.Size>> GetSize()
        {
            try
            {
                var strlist = strrep.GetDataListAll();

                return new Response<IEnumerable<Domain.Size>>(strlist.Select(m => new Domain.Size
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    SizeId = m.SizeId,
                    Lookup=m.Lookup,
                    ItemType=m.ItemType,
                    Seqno=(int)m.Seqno,
                    SizeName = m.SizeName,
                    ActualSize=(int)m.ActualSize
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Size>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }
        public Response<IEnumerable<AxonApparel.Domain.Size>> GetFSize()
        {
            try
            {
                var strlist = strrep.GetFDataList();

                return new Response<IEnumerable<Domain.Size>>(strlist.Select(m => new Domain.Size
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    SizeId = m.SizeId,
                    Lookup = m.Lookup,
                    ItemType = m.ItemType,
                    Seqno = (int)m.Seqno,
                    SizeName = m.SizeName,
                    ActualSize = (int)m.ActualSize
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Size>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }
        public Response<IEnumerable<AxonApparel.Domain.Size>> GetGSize()
        {
            try
            {
                var strlist = strrep.GetGDataList();

                return new Response<IEnumerable<Domain.Size>>(strlist.Select(m => new Domain.Size
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    SizeId = m.SizeId,
                    Lookup = m.Lookup,
                    ItemType = m.ItemType,
                    Seqno = (int)m.Seqno,
                    SizeName = m.SizeName,
                    ActualSize = (int)m.ActualSize
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Size>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }
        public Response<IEnumerable<AxonApparel.Domain.Size>> GetYSize()
        {
            try
            {
                var strlist = strrep.GetYDataList();

                return new Response<IEnumerable<Domain.Size>>(strlist.Select(m => new Domain.Size
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    SizeId = m.SizeId,
                    Lookup = m.Lookup,
                    ItemType = m.ItemType,
                    Seqno = (int)m.Seqno,
                    SizeName = m.SizeName,
                    ActualSize = (int)m.ActualSize
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Size>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<AxonApparel.Domain.Size> GetSizeId(int SizeId)
        {
            try
            {
                var str = strrep.GetDataById(SizeId);
                return new Response<Domain.Size>(new Domain.Size
                {

                    IsActive = Convert.ToBoolean(str.IsActive) ? "TRUE" : "FALSE",
                    SizeId = str.SizeId,
                    Lookup = (str.lookup == null ? "" : str.lookup),//m.lookup,
                    ItemType = (str.Item_Type == null ? "" : str.Item_Type),//m.Item_Type,
                    Seqno = (int)(str.SeqNo == null ? 0 : str.SeqNo),//(int)m.SeqNo,
                    SizeName = str.size1,
                    ActualSize = (int)str.ActualSize
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Size>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Response<int> CreateSize(AxonApparel.Domain.Size SizeAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(SizeAdd.SizeName))
                    return new Response<int>(0, Status.ERROR, "Given Size is empty");
                if (isNameAvailableAlready(SizeAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Size is already available");

                return new Response<int>(strrep.AddData(new Repository.Size
                {
                    IsActive = SizeAdd.IsActive.ToUpper() == "TRUE",
                    SizeId = SizeAdd.SizeId,
                    size1 = SizeAdd.SizeName,
                    lookup=SizeAdd.Lookup,
                    ActualSize=SizeAdd.ActualSize,
                    SeqNo=SizeAdd.Seqno,
                    Item_Type=SizeAdd.ItemType
                    }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateSize(AxonApparel.Domain.Size SizeUpd)
        {
            if (string.IsNullOrEmpty(SizeUpd.SizeName))
                return new Response<bool>(false, Status.ERROR, "Given Size is empty");
            if (isNameAvailableAlready(SizeUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Size is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.Size
            {
                IsActive = SizeUpd.IsActive.ToUpper() == "TRUE",
                SizeId=SizeUpd.SizeId,
                size1=SizeUpd.SizeName,
                lookup=SizeUpd.Lookup,
                SeqNo=SizeUpd.Seqno,
                Item_Type=SizeUpd.ItemType,
                ActualSize=SizeUpd.ActualSize
               }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteSize(int SizeId)
        {
            return new Response<bool>(strrep.DeleteData(SizeId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Size st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetSize().Value.Where(c => c.SizeName.ToUpper() == st.SizeName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetSize().Value.Where(c => c.SizeName.ToUpper() == st.SizeName.ToUpper() && c.SizeId != st.SizeId).ToList().Count > 0);
            }
            return false;

        }


        public Response<IList<Domain.Size>> GetSizeCheckItemDetails(int SizeId)
        {
            try
            {
                var ProductEWO = strrep.GetRepSizeCheckItemDetails(SizeId);

                return new Response<IList<Domain.Size>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Size>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateSeqEntry(int[] sbTwo)
        {
            try
            {                           
                
                var detailList = new List<Repository.Size>();
                var PrSeq = 0;
                foreach (var item in sbTwo)
                {
                    PrSeq = PrSeq + 1;
                    detailList.Add(new Repository.Size
                    {
                        SizeId = item,
                        SeqNo = PrSeq,                      
                      

                    });
                }
                var result = strrep.UpdateSizSeqDetData(detailList);

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.Size>> GetSizeSeqList()
        {
            try
            {
                var CurDetList = strrep.GetSizeRepSeqDetList();

                return new Response<IList<Domain.Size>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.Size>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
