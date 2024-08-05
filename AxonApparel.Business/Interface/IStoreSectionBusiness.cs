using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;



namespace AxonApparel.Business
{
    public interface IStoreSectionBusiness
    {
        Response<IEnumerable<StoreSection>> GetSection();
        Response<StoreSection> GetSectionId(int SectionId);
        Response<int> CreateSection(StoreSection SectionAdd);
        Response<bool> UpdateSection(StoreSection ScetionUpd);
        Response<bool> DeleteSection(int SectionId);

    }
}
