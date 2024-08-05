using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IStyleTemplateRepository
    {
        IEnumerable<Domain.StyleTemplateMas> GetDataMainList();
        bool AddData(StyleTempMas objAdd);
        StyleTempMas GetDataById(int id);
        bool UpdateData(Repository.StyleTempMas objUpd);
        IQueryable<Domain.StyleTemplateDet> GetStyleTemp(int id);
        bool DeleteData(int id);
    }
}
