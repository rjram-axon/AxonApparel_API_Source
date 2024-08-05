CREATE TABLE [dbo].[Process_Qlty_mas]
(
	[Proc_qlty_Masid] [int] IDENTITY(1,1) NOT NULL primary key,	
	[Proc_Qlty_no] [varchar](20) NOT NULL,
	[Proc_qlty_date] [datetime] NULL,
	[Proc_Recpt_no] [varchar](20) NOT NULL,
	[Remarks] [varchar](500) NULL,
	[NetAmount] [numeric](15, 5) NULL,
	[GrossAmount] [numeric](15, 5) NULL,
	[DebtRaised] [varchar](1) NULL DEFAULT ('N'), 
    CONSTRAINT [CK_Process_Qlty_mas_Column] CHECK (([DebtRaised] = 'N' or [DebtRaised] = 'Y'))
)
