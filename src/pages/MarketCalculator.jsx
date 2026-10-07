import { useEffect, useMemo, useState } from 'react';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button.jsx';
import SimpleBarChart from '../components/SimpleBarChart.jsx';
import PriceComparisonChart from '../components/PriceComparisonChart.jsx';
import Badge from '../components/Badge.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import EmptyState from '../components/EmptyState.jsx';
import EasyModeBanner from '../components/EasyModeBanner.jsx';
import { MARKET_PRICES, MARKETS, uniqueCropsFromPrices, getLocalizedMarketCrop, getLocalizedMarketName } from '../data/marketPrices.js';
import { calculateFarmProfit, estimatedNetSellingValue } from '../utils/calculations.js';
import { validateCalculator } from '../utils/validation.js';
import { formatINR, uid, formatDate } from '../utils/format.js';
import { useAppData } from '../context/AppDataContext.jsx';
import { useToast } from '../components/Toast.jsx';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant.js';
import { CROPS, getCropName } from '../data/crops.js';
import DataStatusBadge from '../components/DataStatusBadge.jsx';

const EMPTY_CALC = {
  cropName: '',
  landArea: '',
  areaUnit: 'acres',
  seed: '',
  fertilizer: '',
  labour: '',
  irrigation: '',
  pesticide: '',
  other: '',
  expectedYield: '',
  sellingPrice: '',
};

export default function MarketCalculator() {
  const { calculations, setCalculations, logActivity, selectedCropId, language, easyMode, t } = useAppData();
  const toast = useToast();
  const selected = CROPS.find((c) => c.id === selectedCropId);

  const { speak, isSpeaking, stopSpeaking } = useVoiceAssistant({ language });

  useEffect(() => {
    document.title =
      language === 'te'
        ? 'మార్కెట్ మండి ధరలు & లాభ నష్టాల కాలిక్యులేటర్ — అగ్రిమిత్ర'
        : language === 'hi'
        ? 'मंडी भाव और कृषि मुनाफा कैलकुलेटर — एग्रीमित्र'
        : 'Mandi Prices & Farm Profit Calculator — AgriMitra';
  }, [language]);

  const [cropFilter, setCropFilter] = useState('All');
  const [marketFilter, setMarketFilter] = useState('All');
  const [sortKey, setSortKey] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [transport, setTransport] = useState('0');
  const [form, setForm] = useState(() => ({ ...EMPTY_CALC, cropName: selected ? getCropName(selected, language) : '' }));
  const [errors, setErrors] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const rows = useMemo(() => {
    const transportCost = Number(transport) >= 0 ? Number(transport) || 0 : 0;
    let list = MARKET_PRICES.filter((r) => {
      const cropOk = cropFilter === 'All' || r.crop === cropFilter;
      const marketOk = marketFilter === 'All' || r.market === marketFilter;
      return cropOk && marketOk;
    }).map((r) => ({ ...r, net: estimatedNetSellingValue(r.price, transportCost) }));

    if (list.length > 0) {
      const prices = list.map((r) => r.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      list = list.map((r) => ({
        ...r,
        badge: r.price === min ? 'Lowest' : r.price === max ? 'Highest' : '',
      }));
    }

    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === 'asc' ? av - bv : bv - av;
    });
    return list;
  }, [cropFilter, marketFilter, sortKey, sortDir, transport]);

  const avgPrice = useMemo(() => {
    if (rows.length === 0) return 0;
    const sum = rows.reduce((s, r) => s + r.price, 0);
    return Math.round(sum / rows.length);
  }, [rows]);

  const chartItems = rows.slice(0, 8).map((r) => ({
    label: r.market.split(' ')[0],
    value: r.price,
    highlight: r.badge === 'Lowest' ? 'var(--accent-orange)' : r.badge === 'Highest' ? 'var(--primary)' : 'var(--accent-gold)',
  }));

  // For the improved area-wise chart — include localized market names
  const chartRows = rows.slice(0, 8).map((r) => ({
    ...r,
    marketLabel: getLocalizedMarketName(r.market, language),
  }));

  const live = calculateFarmProfit(form);
  const roi = live.totalCost > 0 ? ((live.profitLoss / live.totalCost) * 100).toFixed(1) : 0;
  const breakEvenPrice = Number(form.expectedYield) > 0 ? Math.round(live.totalCost / Number(form.expectedYield)) : 0;

  function sortBy(key) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setShowResult(true);
  }

  function onCalculate(e) {
    e.preventDefault();
    const next = validateCalculator(form);
    setErrors(next);
    if (Object.keys(next).length) {
      toast(language === 'te' ? 'దయచేసి అవసరమైన వివరాలను నమోదు చేయండి.' : language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please review and correct the required input fields.', 'error');
      setShowResult(false);
      return;
    }
    setShowResult(true);
    toast(language === 'te' ? 'లాభ నష్టాలు విజయవంతంగా లెక్కించబడ్డాయి.' : language === 'hi' ? 'गणना सफल रही।' : 'Figures computed successfully.', 'success');
  }

  function saveCalc() {
    const next = validateCalculator(form);
    setErrors(next);
    if (Object.keys(next).length) {
      toast('Fix errors before saving.', 'error');
      return;
    }
    const record = {
      id: uid('calc'),
      ...form,
      ...calculateFarmProfit(form),
      savedAt: new Date().toISOString(),
    };
    setCalculations((prev) => [record, ...prev]);
    logActivity(`Saved profit calculation for ${form.cropName}`);
    toast(language === 'te' ? 'మీ లెక్కలు ఈ ఫోన్/కంప్యూటర్‌లో భద్రపరచబడ్డాయి.' : language === 'hi' ? 'हिसाब सुरक्षित कर लिया गया।' : 'Calculation saved in your browser.', 'success');
  }

  function handleUsePriceInCalc(price, cropName) {
    setForm((prev) => ({
      ...prev,
      sellingPrice: String(price),
      cropName: prev.cropName || cropName,
    }));
    setShowResult(true);
    toast(`Copied ₹${price}/q to calculator selling price.`, 'info');
    const elem = document.getElementById('part-b-calculator');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  }

  function deleteCalculation() {
    if (!deleteId) return;
    setCalculations((prev) => prev.filter((c) => c.id !== deleteId));
    toast(t('common.delete') + ' successful.', 'info');
    setDeleteId(null);
  }

  function speakProfitVerdict() {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const isProfit = live.profitLoss >= 0;
    const text =
      language === 'te'
        ? `${form.cropName || 'మీ పంట'} లెక్కలు: మొత్తం సాగు ఖర్చు ${formatINR(live.totalCost)}, మొత్తం ఆశించిన రాబడి ${formatINR(live.grossRevenue)}. ${isProfit ? `మంచి లాభం! మీకు ${formatINR(live.profitLoss)} నికర లాభం వస్తుంది, రాబడి శాతం ${roi} శాతం.` : `జాగ్రత్త! ఖర్చులు రాబడి కన్నా ఎక్కువ ఉన్నాయి, నష్టం ${formatINR(Math.abs(live.profitLoss))}. ఖర్చు సమాన ధర క్వింటాలుకు ${formatINR(breakEvenPrice)}.`}`
        : language === 'hi'
        ? `${form.cropName || 'आपकी फसल'} का हिसाब: कुल लागत ${formatINR(live.totalCost)}, कुल आमदनी ${formatINR(live.grossRevenue)}। ${isProfit ? `बढ़िया मुनाफा! आपको ${formatINR(live.profitLoss)} का शुद्ध लाभ होगा, मुनाफा दर ${roi}% है।` : `सतर्क रहें! लागत बिक्री से अधिक है, अनुमानित घाटा ${formatINR(Math.abs(live.profitLoss))} है। ब्रेक-ईवन भाव ${formatINR(breakEvenPrice)} प्रति क्विंटल है।`}`
        : `Profit scenario for ${form.cropName || 'your crop'}: Total cultivation cost is ${formatINR(live.totalCost)}, estimated gross revenue is ${formatINR(live.grossRevenue)}. ${isProfit ? `Great profit! Projected net earnings are ${formatINR(live.profitLoss)} with ${roi}% ROI.` : `Caution: Costs exceed revenue. Projected net loss is ${formatINR(Math.abs(live.profitLoss))}. Break-even price is ${formatINR(breakEvenPrice)} per quintal.`}`;
    speak(text);
  }

  // Pre-set templates for easy 1-click farmer calculation
  const PRESETS = [
    { label: language === 'te' ? '🌾 1 ఎకరం వరి' : language === 'hi' ? '🌾 1 एकड़ धान' : '🌾 1 Acre Paddy', crop: 'Rice (Paddy)', area: '1', yieldVal: '25', price: '2150', seed: '1800', fert: '3500', lab: '8000', irr: '2500', pest: '1500', oth: '2500' },
    { label: language === 'te' ? '🌿 1 ఎకరం పత్తి' : language === 'hi' ? '🌿 1 एकड़ कपास' : '🌿 1 Acre Cotton', crop: 'Cotton', area: '1', yieldVal: '8', price: '6800', seed: '2200', fert: '4500', lab: '9000', irr: '2000', pest: '3500', oth: '3000' },
    { label: language === 'te' ? '🌶 1 ఎకరం మిరప' : language === 'hi' ? '🌶 1 एकड़ मिर्च' : '🌶 1 Acre Chilli', crop: 'Chilli', area: '1', yieldVal: '18', price: '9800', seed: '4000', fert: '8000', lab: '18000', irr: '4000', pest: '8000', oth: '5000' },
    { label: language === 'te' ? '🌽 2 ఎకరాలు మొక్కజొన్న' : language === 'hi' ? '🌽 2 एकड़ मक्का' : '🌽 2 Acres Maize', crop: 'Maize', area: '2', yieldVal: '45', price: '1850', seed: '3200', fert: '6000', lab: '7000', irr: '3000', pest: '2000', oth: '4000' },
  ];

  function applyPreset(p) {
    setForm({
      cropName: p.crop,
      landArea: p.area,
      areaUnit: 'acres',
      seed: p.seed,
      fertilizer: p.fert,
      labour: p.lab,
      irrigation: p.irr,
      pesticide: p.pest,
      other: p.oth,
      expectedYield: p.yieldVal,
      sellingPrice: p.price,
    });
    setShowResult(true);
    toast(`${p.label} loaded into calculator.`, 'success');
  }

  const easySteps = [
    {
      icon: '🌾',
      label: language === 'te' ? '1. పంట & ఎకరాలు' : language === 'hi' ? '1. फसल और एकड़' : '1. Crop & Acres',
      desc: language === 'te' ? 'పంట పేరు మరియు విస్తీర్ణం' : language === 'hi' ? 'फसल और जमीन का रकबा' : 'Choose crop & land size',
    },
    {
      icon: '💵',
      label: language === 'te' ? '2. ఖర్చులు & దిగుబడి' : language === 'hi' ? '2. लागत और पैदावार' : '2. Costs & Yield',
      desc: language === 'te' ? 'విత్తనాలు, ఎరువులు, కూలి' : language === 'hi' ? 'बीज, खाद, मजदूरी' : 'Seeds, fertilizers, labour',
    },
    {
      icon: '🎉',
      label: language === 'te' ? '3. లాభం వినండి' : language === 'hi' ? '3. मुनाफा सुनें' : '3. Listen to Profit',
      desc: language === 'te' ? 'నికర లాభం లెక్క' : language === 'hi' ? 'शुद्ध कमाई की जांच' : 'Projected net earnings',
    },
  ];

  return (
    <div className="market-calculator-page">
      {/* Easy Mode Banner */}
      <EasyModeBanner
        title={t('easyModeView.badge')}
        speakText={
          language === 'te'
            ? 'మార్కెట్ ధరలు మరియు లాభం కాలిక్యులేటర్. మీరు వివిధ మండీల ధరలు చూడవచ్చు మరియు మీ సాగు ఖర్చులు, లాభాలను సులభంగా లెక్కించవచ్చు.'
            : language === 'hi'
            ? 'मंडी भाव और मुनाफा कैलकुलेटर। आप विभिन्न मंडियों के भाव देख सकते हैं और अपनी फसल की लागत व मुनाफा निकाल सकते हैं।'
            : 'Mandi Market Prices & Farm Profit Calculator. Compare mandi benchmarks and calculate your cultivation costs and net returns.'
        }
        steps={easySteps}
      />

      <div className="section-title">
        <div>
          <h1>{t('market.title')}</h1>
          <p className="muted">{t('market.subtitle')}</p>
        </div>
      </div>

      {/* Part A: Mandi Prices */}
      <section className="card">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p className="hand-label">
              {language === 'te' ? 'మార్కెట్ సమాచారం' : language === 'hi' ? 'मंडी विश्लेषण' : 'Market Intelligence'}
            </p>
            <h2 style={{ margin: 0 }}>{t('market.partATitle')}</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <DataStatusBadge status="sample" language={language} sourceName="Educational" />
            {rows.length > 0 && (
              <Badge tone="info">
                {language === 'te' ? 'సగటు ధర: ' : language === 'hi' ? 'औसत भाव: ' : 'Average: '}
                {formatINR(avgPrice)} / {t('common.quintal')}
              </Badge>
            )}
          </div>
        </div>

        <p className="notice warning" style={{ marginTop: '0.75rem' }}>
          {t('market.sampleNote')}
        </p>

        <div className="filters" style={{ marginTop: '1rem' }}>
          <FormField
            id="m-crop"
            label={t('market.filterCrop')}
            as="select"
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
          >
            <option value="All">{t('common.all')} ({uniqueCropsFromPrices().length})</option>
            {uniqueCropsFromPrices().map((c) => (
              <option key={c} value={c}>{getLocalizedMarketCrop(c, language)}</option>
            ))}
          </FormField>
          <FormField
            id="m-market"
            label={t('market.filterMarket')}
            as="select"
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}
          >
            <option value="All">{t('common.all')} ({MARKETS.length})</option>
            {MARKETS.map((m) => (
              <option key={m} value={m}>{getLocalizedMarketName(m, language)}</option>
            ))}
          </FormField>
          <FormField
            id="transport"
            label={t('market.deductTransport')}
            type="number"
            min="0"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
          />
        </div>

        {rows.length === 0 ? (
          <EmptyState
            title={language === 'te' ? 'నమూనా ధరలు దొరకలేదు' : language === 'hi' ? 'कोई भाव नहीं मिला' : 'No sample rows found'}
            text={language === 'te' ? 'పంట లేదా మార్కెట్ ఫిల్టర్‌లో "అన్నీ" ఎంచుకోండి.' : language === 'hi' ? 'कृपया फसल या मंडी में "सभी" चुनें।' : 'Try selecting All in the crop or market dropdown.'}
          />
        ) : (
          <>
            <div className="table-wrap" style={{ marginTop: '1rem' }}>
              <table className="data">
                <thead>
                  <tr>
                    <th onClick={() => sortBy('crop')} style={{ cursor: 'pointer' }}>
                      {t('market.cropName')} {sortKey === 'crop' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => sortBy('market')} style={{ cursor: 'pointer' }}>
                      {language === 'te' ? 'మార్కెట్ / మండి' : language === 'hi' ? 'मंडी (APMC)' : 'Mandi / APMC'} {sortKey === 'market' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => sortBy('price')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                      {t('market.mandiPriceHeader')} {sortKey === 'price' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    {Number(transport) > 0 && (
                      <th style={{ textAlign: 'right' }}>{t('market.netPriceHeader')}</th>
                    )}
                    <th>{t('market.tagHeader')}</th>
                    <th>{t('market.actionHeader')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td><strong>{getLocalizedMarketCrop(r.crop, language)}</strong></td>
                      <td>{getLocalizedMarketName(r.market, language)}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatINR(r.price)}</td>
                      {Number(transport) > 0 && (
                        <td style={{ textAlign: 'right', color: 'var(--primary)', fontWeight: 600 }}>
                          {formatINR(r.net)}
                        </td>
                      )}
                      <td>
                        {r.badge ? (
                          <Badge tone={r.badge === 'Highest' ? 'low' : 'high'}>
                            {r.badge === 'Highest'
                              ? (language === 'te' ? 'అత్యధిక ధర' : language === 'hi' ? 'उच्चतम भाव' : 'Highest')
                              : (language === 'te' ? 'అత్యల్ప ధర' : language === 'hi' ? 'న्यूनतम भाव' : 'Lowest')}
                          </Badge>
                        ) : (
                          <span className="muted">—</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleUsePriceInCalc(r.price, getLocalizedMarketCrop(r.crop, language))}
                          title={language === 'te' ? 'ఈ ధరను కాలిక్యులేటర్‌లో వాడండి' : language === 'hi' ? 'यह भाव कैलकुलेटर में लोड करें' : 'Copy this price to profit calculator'}
                        >
                          {t('market.useInCalc')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {chartRows.length > 0 && (
              <PriceComparisonChart
                rows={chartRows}
                language={language}
                cropName={cropFilter !== 'All' ? getLocalizedMarketCrop(cropFilter, language) : null}
                formatINR={formatINR}
                easyMode={easyMode}
              />
            )}
          </>
        )}
      </section>

      <div className="furrow" />

      {/* Part B: Profit Calculator */}
      <section className="card paper-card" id="part-b-calculator">
        <p className="hand-label">
          {language === 'te' ? 'సాగు ఖర్చు & రాబడి' : language === 'hi' ? 'खेत का हिसाब' : 'Field Economics'}
        </p>
        <h2>{t('market.partBTitle')}</h2>
        <p className="muted">{t('market.partBSub')}</p>

        {/* 1-Click Fast Presets */}
        <div style={{ marginTop: '1rem', background: 'var(--surface-2)', padding: '0.85rem', borderRadius: 'var(--radius)' }}>
          <strong style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>
            ⚡ {language === 'te' ? 'త్వరిత లెక్కల నమూనాలు (1-క్లిక్):' : language === 'hi' ? 'तुरंत लोड करें (1-क्लिक):' : 'Quick Crop Presets:'}
          </strong>
          <div className="row" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
            {PRESETS.map((p, idx) => (
              <Button key={idx} size="sm" variant="secondary" onClick={() => applyPreset(p)}>
                {p.label}
              </Button>
            ))}
          </div>
        </div>

        <form onSubmit={onCalculate} style={{ marginTop: '1.25rem' }}>
          <div className="grid-3">
            <FormField
              id="calc-crop"
              label={t('market.cropName')}
              value={form.cropName}
              error={errors.cropName}
              onChange={(e) => update('cropName', e.target.value)}
            />
            <FormField
              id="calc-area"
              label={t('market.cultivatedArea')}
              type="number"
              step="0.1"
              min="0"
              value={form.landArea}
              error={errors.landArea}
              onChange={(e) => update('landArea', e.target.value)}
            />
            <FormField
              id="calc-unit"
              label={t('market.landUnit')}
              as="select"
              value={form.areaUnit}
              onChange={(e) => update('areaUnit', e.target.value)}
            >
              <option value="acres">{t('common.acres')}</option>
              <option value="hectares">{t('common.hectares')}</option>
            </FormField>
          </div>

          <h3 style={{ margin: '1.25rem 0 0.5rem' }}>{t('market.inputCostsHeader')}</h3>
          <div className="grid-3">
            <FormField
              id="c-seed"
              label={t('market.seedCost')}
              type="number"
              min="0"
              value={form.seed}
              onChange={(e) => update('seed', e.target.value)}
            />
            <FormField
              id="c-fert"
              label={t('market.fertilizerCost')}
              type="number"
              min="0"
              value={form.fertilizer}
              onChange={(e) => update('fertilizer', e.target.value)}
            />
            <FormField
              id="c-labour"
              label={t('market.labourCost')}
              type="number"
              min="0"
              value={form.labour}
              onChange={(e) => update('labour', e.target.value)}
            />
            <FormField
              id="c-irr"
              label={t('market.irrigationCost')}
              type="number"
              min="0"
              value={form.irrigation}
              onChange={(e) => update('irrigation', e.target.value)}
            />
            <FormField
              id="c-pest"
              label={t('market.pesticideCost')}
              type="number"
              min="0"
              value={form.pesticide}
              onChange={(e) => update('pesticide', e.target.value)}
            />
            <FormField
              id="c-other"
              label={t('market.otherCost')}
              type="number"
              min="0"
              value={form.other}
              onChange={(e) => update('other', e.target.value)}
            />
          </div>

          <h3 style={{ margin: '1.25rem 0 0.5rem' }}>{t('market.harvestHeader')}</h3>
          <div className="grid-2">
            <FormField
              id="c-yield"
              label={t('market.expectedYield')}
              type="number"
              min="0"
              step="0.1"
              value={form.expectedYield}
              error={errors.expectedYield}
              onChange={(e) => update('expectedYield', e.target.value)}
            />
            <FormField
              id="c-price"
              label={t('market.expectedPrice')}
              type="number"
              min="0"
              value={form.sellingPrice}
              error={errors.sellingPrice}
              onChange={(e) => update('sellingPrice', e.target.value)}
            />
          </div>

          <div className="row" style={{ marginTop: '1.25rem', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button type="submit">{t('market.computeBtn')}</Button>
            <Button type="button" variant="secondary" onClick={saveCalc}>
              {t('market.saveCalcBtn')}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setForm(EMPTY_CALC);
                setShowResult(false);
                setErrors({});
              }}
            >
              {t('common.reset')}
            </Button>
          </div>
        </form>

        {/* Live Calculation Result Cards */}
        {showResult && (
          <div style={{ marginTop: '1.5rem', borderTop: '2px dashed var(--border)', paddingTop: '1.5rem' }}>
            <div
              className="card"
              style={{
                background: live.profitLoss >= 0 ? 'var(--surface-2)' : '#fff3f0',
                border: `2px solid ${live.profitLoss >= 0 ? 'var(--primary)' : 'var(--accent-orange)'}`,
                padding: '1.25rem',
              }}
            >
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ margin: 0 }}>
                    {live.profitLoss >= 0 ? `🎉 ${t('market.netProfit')}` : `⚠️ ${t('market.netLoss')}`}
                  </h3>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: live.profitLoss >= 0 ? 'var(--primary)' : 'var(--accent-orange)' }}>
                    {formatINR(live.profitLoss)}
                  </div>
                  <p style={{ margin: '0.25rem 0 0', fontWeight: 600 }}>
                    {live.profitLoss >= 0 ? t('easyModeView.quickProfitVerdictGood') : t('easyModeView.quickProfitVerdictLoss')}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <Button
                    size="sm"
                    variant={isSpeaking ? 'danger' : 'primary'}
                    onClick={speakProfitVerdict}
                    style={{ marginBottom: '0.5rem' }}
                  >
                    {isSpeaking ? '⏹ ' + t('common.stopReading') : '🔊 ' + t('easyModeView.listenToResult')}
                  </Button>
                  <div>
                    <Badge tone={live.profitLoss >= 0 ? 'low' : 'high'}>
                      {t('market.roi')} {roi}%
                    </Badge>
                  </div>
                  {breakEvenPrice > 0 && (
                    <p className="muted" style={{ margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
                      {t('market.breakEven')} {formatINR(breakEvenPrice)}/q
                    </p>
                  )}
                </div>
              </div>

              <div className="grid-3" style={{ marginTop: '1rem', gap: '0.75rem' }}>
                <div className="card" style={{ padding: '0.75rem' }}>
                  <span className="muted" style={{ fontSize: '0.85rem' }}>{t('market.totalCost')}</span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{formatINR(live.totalCost)}</div>
                </div>
                <div className="card" style={{ padding: '0.75rem' }}>
                  <span className="muted" style={{ fontSize: '0.85rem' }}>{t('market.grossRevenue')}</span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{formatINR(live.grossRevenue)}</div>
                </div>
                <div className="card" style={{ padding: '0.75rem' }}>
                  <span className="muted" style={{ fontSize: '0.85rem' }}>
                    {t('market.costPerUnit').replace('{unit}', form.areaUnit || 'acre')}
                  </span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                    {Number(form.landArea) > 0 ? formatINR(Math.round(live.totalCost / Number(form.landArea))) : '—'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Part C: Saved Calculations */}
      <section className="card" style={{ marginTop: '1.5rem' }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>{t('market.partCTitle')}</h2>
            <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
              {t('market.partCSub')}
            </p>
          </div>
        </div>

        {calculations.length === 0 ? (
          <EmptyState
            title={t('market.noSavedCalcs')}
            text={t('market.noSavedCalcsDesc')}
          />
        ) : (
          <div className="grid-2" style={{ marginTop: '1rem' }}>
            {calculations.map((c) => (
              <article key={c.id} className="card" style={{ borderLeft: c.profitLoss >= 0 ? '4px solid var(--primary)' : '4px solid var(--accent-orange)' }}>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0 }}>{c.cropName}</h3>
                  <Badge tone={c.profitLoss >= 0 ? 'low' : 'high'}>
                    {c.profitLoss >= 0 ? `+${formatINR(c.profitLoss)}` : formatINR(c.profitLoss)}
                  </Badge>
                </div>
                <p className="muted" style={{ margin: '0.35rem 0', fontSize: '0.85rem' }}>
                  {t('market.cultivatedArea')}: {c.landArea} {c.areaUnit} · {c.expectedYield} q @ {formatINR(c.sellingPrice)}/q
                </p>
                <div className="row" style={{ justifyContent: 'space-between', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                  <span>{t('market.totalCost')}: <strong>{formatINR(c.totalCost)}</strong></span>
                  <span>{t('market.grossRevenue')}: <strong>{formatINR(c.grossRevenue)}</strong></span>
                </div>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                  <span className="muted" style={{ fontSize: '0.8rem' }}>{formatDate(c.savedAt)}</span>
                  <div className="row" style={{ gap: '0.5rem' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setForm(c);
                        setShowResult(true);
                        const elem = document.getElementById('part-b-calculator');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {t('market.loadIntoForm')}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => setDeleteId(c.id)}>
                      {t('common.delete')}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {deleteId && (
        <ConfirmDialog
          title={language === 'te' ? 'లెక్కల రికార్డును తొలగించు' : language === 'hi' ? 'गणना रिकॉर्ड हटाएं' : 'Delete Calculation Record'}
          message={language === 'te' ? 'మీరు ఖచ్చితంగా ఈ సేవ్ చేసిన లెక్కను తొలగించాలనుకుంటున్నారా? ఇది మీ బ్రౌజర్ నుండి తొలగించబడుతుంది.' : language === 'hi' ? 'क्या आप वाकई इस सहेजी गई गणना को हटाना चाहते हैं? यह आपके डिवाइस से हट जाएगी।' : 'Are you sure you want to delete this saved calculation? This will remove it from your device records.'}
          confirmLabel={t('common.delete')}
          cancelLabel={t('common.cancel')}
          danger
          onConfirm={deleteCalculation}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
