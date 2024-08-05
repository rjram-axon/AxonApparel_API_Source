CREATE TABLE [dbo].[InvoiceLedger]
(
    [InvLedId] [int] IDENTITY(1,1) NOT NULL, 
	[ProcessordId] [int] NOT NULL,
	[PType] [char](1) NULL,
	[LedgerId] [int] NULL,
    [Credit] [numeric](18, 3) NULL,
	[Debit] [numeric](18, 3) NULL,
	[Module][varchar](50),
	[Menu][varchar](70),
	[InvoiceId] [int],
    CONSTRAINT [PK_InvoiceLedger] PRIMARY KEY ([InvLedId])
)
