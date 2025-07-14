import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check, Crown, Zap, Shield, Star } from 'lucide-react-native';
import Colors from '@/constants/colors';

const PREMIUM_FEATURES = [
  {
    icon: <Zap size={24} color="#FFD700" />,
    title: 'Priority Booking',
    description: 'Get first access to prime time slots and popular courts'
  },
  {
    icon: <Shield size={24} color="#FFD700" />,
    title: 'No Booking Fees',
    description: 'Save money with zero booking and service fees'
  },
  {
    icon: <Star size={24} color="#FFD700" />,
    title: 'Advanced Stats',
    description: 'Detailed match analytics and performance tracking'
  },
  {
    icon: <Crown size={24} color="#FFD700" />,
    title: 'Exclusive Tournaments',
    description: 'Access to premium tournaments and events'
  },
];

const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 9.99,
    period: 'month',
    popular: false,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 79.99,
    period: 'year',
    popular: true,
    savings: 'Save 33%',
  },
];

export default function PremiumScreen() {
  const router = useRouter();

  const handleSubscribe = (planId: string) => {
    // In a real app, this would handle the subscription process
    alert(`Subscribing to ${planId} plan`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color={Colors.text.light} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Premium</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <View style={styles.premiumIcon}>
            <Crown size={48} color="#FFD700" />
          </View>
          <Text style={styles.heroTitle}>Upgrade to Premium</Text>
          <Text style={styles.heroSubtitle}>
            Unlock exclusive features and enhance your padel experience
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          {PREMIUM_FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                {feature.icon}
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          {PLANS.map((plan) => (
            <View key={plan.id} style={[
              styles.planCard,
              plan.popular && styles.popularPlan
            ]}>
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                {plan.savings && (
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsText}>{plan.savings}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.planPricing}>
                <Text style={styles.planPrice}>€{plan.price}</Text>
                <Text style={styles.planPeriod}>/{plan.period}</Text>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.subscribeButton,
                  plan.popular && styles.popularSubscribeButton
                ]}
                onPress={() => handleSubscribe(plan.id)}
              >
                <Text style={[
                  styles.subscribeButtonText,
                  plan.popular && styles.popularSubscribeButtonText
                ]}>
                  Subscribe
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Why Go Premium?</Text>
          
          <View style={styles.benefitItem}>
            <Check size={20} color="#22c55e" />
            <Text style={styles.benefitText}>Cancel anytime, no commitment</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Check size={20} color="#22c55e" />
            <Text style={styles.benefitText}>7-day free trial for new users</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Check size={20} color="#22c55e" />
            <Text style={styles.benefitText}>24/7 premium customer support</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Check size={20} color="#22c55e" />
            <Text style={styles.benefitText}>Exclusive member-only events</Text>
          </View>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I cancel anytime?</Text>
            <Text style={styles.faqAnswer}>
              Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Is there a free trial?</Text>
            <Text style={styles.faqAnswer}>
              New users get a 7-day free trial to experience all premium features before being charged.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What payment methods do you accept?</Text>
            <Text style={styles.faqAnswer}>
              We accept all major credit cards, PayPal, and Apple Pay for your convenience.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.light,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.background.dark,
  },
  premiumIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.light,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.text.light,
    textAlign: 'center',
    opacity: 0.8,
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.text.gray,
    lineHeight: 20,
  },
  plansSection: {
    padding: 20,
    backgroundColor: Colors.background.secondary,
  },
  planCard: {
    backgroundColor: Colors.background.main,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  popularPlan: {
    borderColor: '#FFD700',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  savingsBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.light,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  planPeriod: {
    fontSize: 16,
    color: Colors.text.gray,
    marginLeft: 4,
  },
  subscribeButton: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  popularSubscribeButton: {
    backgroundColor: Colors.primary,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  popularSubscribeButtonText: {
    color: Colors.text.light,
  },
  benefitsSection: {
    padding: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    color: Colors.text.dark,
    marginLeft: 12,
  },
  faqSection: {
    padding: 20,
    backgroundColor: Colors.background.secondary,
  },
  faqItem: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: Colors.text.gray,
    lineHeight: 20,
  },
});