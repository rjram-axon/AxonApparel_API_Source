using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IEnquiryBusiness
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<IQueryable<Enquiry>> GetEnquiry(int? companyId, string EntryNo, int? buyerId, int? styleId, string fromDate, string toDate);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="EnquiryId"></param>
        /// <returns></returns>

        Response<Enquiry> GetDataById(int EnquiryId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Enquiry"></param>
        /// <returns></returns>

        Response<bool> CreateEnquiry(Enquiry enq);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Enquiry"></param>
        /// <returns></returns>

        Response<int> CreateStyleEnquiry(Enquiry enq);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Enquiry"></param>
        /// <returns></returns>

        Response<bool> UpdateEnquiry(Enquiry enq);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="EnquiryId"></param>
        /// <returns></returns>

        Response<bool> DeleteEnquiry(int EnquiryId);
        Response<IQueryable<Enquiry>> GetEntryNoList();
        Response<IQueryable<Enquiry>> GetBuyRefNo();
    }
}
